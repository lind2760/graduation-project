import { AxiosResponse } from "axios";
import { createError } from "./createError";

export default {};
export interface CacheType {
  [index: string]: AxiosResponse;
}

export class Cache {
  static instance: Cache;

  cache: CacheType = Object.create(null);

  constructor() {
    Cache.instance = this;
    this.cache = {};
  }

  public get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.listenError<T>(() => {
      const value = this.cache[url];

      if (value === undefined) {
        throw Error("缓存");
      }

      return value;
    });
  }

  public set<T>(url: string, value: AxiosResponse) {
    this.cache[url] = value;
    return this.listenError<T>(() => {
      return this.cache;
    });
  }

  public delete(url: string) {
    return this.listenError(() => {
      return delete this.cache[url];
    });
  }

  public clear() {
    this.cache = Object.create(null);
    return this.listenError(() => {
      return this.cache;
    });
  }

  private listenError<T>(cb: Function): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      try {
        resolve(cb.call(this));
      } catch (error) {
        reject(createError("读取缓存数据出错了！", {}));
      }
    });
  }
}
