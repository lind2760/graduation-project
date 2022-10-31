/*eslint-disable*/
import { AxiosError, AxiosRequestConfig } from "axios";

export default {};
export interface CustomConfigType {
  // 是否需要 token 默认值 false
  isNeedToken?: boolean;
  // token 处理函数 默认值 undefined
  setToken?: (config: AxiosRequestConfig) => void;
  // 重新刷新 token 函数 默认值 undefined
  refreshToken?: () => Promise<any>;
  // 是否需要统一处理 error 默认值 true
  isNeedError?: boolean;
  // error 的显示方式 默认值 undefined
  showErrorFn?: (error: AxiosError) => void;
  // 是否需要缓存 默认值 false
  isNeedCache?: boolean;
}
