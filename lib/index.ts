import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  createError,
  emptyObj,
  endsWith,
  handleToken,
  Instance,
  startsWith,
  transformPath,
  Cache,
} from "./utils";
import { customConfigDefault } from "./config";
import { CustomConfigType } from "./types";

const IDENTIFIER = "/";
const cache = new Cache();

export default class AxiosRequest {
  instance: Instance = emptyObj();

  customConfigDefault = customConfigDefault;

  constructor(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    this.setBaseConfig(config, customConfig);
  }

  private setBaseConfig = (
    config: AxiosRequestConfig,
    customConfig: CustomConfigType
  ) => {
    let initConfig: AxiosRequestConfig | null = emptyObj();
    if (config && config.baseURL) {
      // 格式化 baseURL
      initConfig = {
        baseURL: transformPath(config.baseURL, IDENTIFIER, endsWith),
      };
    }
    // 初始化 axios 实例
    this.instance = new Instance(initConfig || undefined);
    // 合并自定义配置
    this.customConfigDefault = {
      ...this.customConfigDefault,
      ...customConfig,
    };
  };

  private static handleBeforeRequest(
    config: AxiosRequestConfig,
    customConfig: CustomConfigType
  ) {
    const { isNeedToken = false, setToken } = customConfig;

    if (isNeedToken && setToken) {
      handleToken(config, setToken);
    }
  }

  private static handleError(
    customConfig: CustomConfigType,
    error: AxiosError
  ) {
    const { isNeedError = false, showErrorFn } = customConfig;

    // 处理错误
    if (isNeedError && showErrorFn) showErrorFn(error);
  }

  private async request<T>(
    config: AxiosRequestConfig,
    customConfig: CustomConfigType
  ): Promise<AxiosResponse<T>> {
    const newCustomerConfig = {
      ...this.customConfigDefault,
      ...customConfig,
    };
    const baseUrl = this.instance.axiosInstance.defaults.baseURL ?? "";

    const requestKey = `${window.location.href}_${
      baseUrl + transformPath(config.url || "", IDENTIFIER, startsWith)
    }_${config.method}`;

    // 网络检查
    if (!window.navigator.onLine) {
      return Promise.reject(createError("网络不可用", config));
    }

    const request = async (): Promise<AxiosResponse<T>> => {
      try {
        AxiosRequest.handleBeforeRequest(config, newCustomerConfig);

        // 请求发起
        const res = await this.instance.axiosInstance.request<T>(config);

        // 设置缓存
        if (newCustomerConfig.isNeedCache) {
          cache.set<T>(requestKey, res);
        }

        return res;
      } catch (error) {
        // 重新刷新 token
        try {
          if (newCustomerConfig.refreshToken) {
            await newCustomerConfig.refreshToken();
            // 重新发起之前 token 失效的请求
            return this.request(config, customConfig);
          }
        } catch (errorObj) {
          return Promise.reject(errorObj);
        }

        // 处理错误
        AxiosRequest.handleError(newCustomerConfig, error as AxiosError);

        // 抛出错误
        return Promise.reject(error);
      }
    };
    if (newCustomerConfig.isNeedCache) {
      try {
        const res = await cache.get<T>(requestKey);
        return res;
      } catch (error) {
        return request();
      }
    } else {
      return request();
    }
  }

  async get<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "get" }, customConfig);
  }

  async post<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "post" }, customConfig);
  }

  async delete<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "delete" }, customConfig);
  }

  async put<T>(
    config: AxiosRequestConfig = emptyObj(),
    customConfig: CustomConfigType = emptyObj()
  ) {
    return this.request<T>({ ...config, method: "put" }, customConfig);
  }
}
