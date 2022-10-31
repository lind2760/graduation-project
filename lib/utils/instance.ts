import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default {};
export class Instance {
  axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = Instance.createdInstance(config);
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /**
   * 创建 axios 实例
   * @param config 请求配置
   * @returns
   */
  static createdInstance(config?: AxiosRequestConfig) {
    return axios.create(config);
  }

  // 添加请求拦截器
  interceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        return config;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
  }

  // 添加响应拦截器
  interceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
      },
      (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }
}
