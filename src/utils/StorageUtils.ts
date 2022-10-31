/** @desc storage相关 */
import { checkIsJSON } from "./CommonUtil";

type TStorageItem = {
  value: any;
  expire: string | number;
  time: Date;
};

type TStorageName = "localStorage" | "sessionStorage";

/**
 * @desc 设置storage
 * @param key 键
 * @param value 值
 * @param expire 过期时间，如果是数值，多长时间后清除，单位毫秒，如果是string，则表示哪个时间清除
 * @param storageName
 */
export const setStorage = (
  key: string,
  value: any,
  expire: number, // 0代表不过期
  storageName: TStorageName = "localStorage"
) => {
  try {
    const data: TStorageItem = {
      value, // 值
      expire, // 过期时间
      time: new Date(), // 存的时间
    };
    window[storageName].setItem(key, JSON.stringify(data));
  } catch (err) {
    // 失败不管
  }
};

/**
 * @desc 获取storage
 * @param key 键
 * @param storageName
 */
export const getStorage = (
  key: string,
  storageName: TStorageName = "localStorage"
) => {
  try {
    const data = window[storageName].getItem(key);
    if (data && checkIsJSON(data)) {
      // 转换
      const obj: TStorageItem = JSON.parse(data);
      const { value, expire, time } = obj;
      const now = new Date().getTime();
      // 判断有没有过期
      if (expire) {
        const delta = now - new Date(time).getTime();
        if (delta > expire) {
          window[storageName].removeItem(key);
          return null;
        }
      }
      return value;
    }
    return null;
  } catch (err) {
    return null;
  }
};

/** @desc 设置localStorage */
export const setLocalStorage = (
  key: string,
  value: any,
  expire: number = 0
) => {
  setStorage(key, value, expire);
};

/** @desc 获取localStorage */
export const getLocalStorage = (key: string) => getStorage(key);

/** @desc 设置sessionStorage */
export const setSessionStorage = (
  key: string,
  value: any,
  expire: number = 0
) => {
  setStorage(key, value, expire, "sessionStorage");
};

/** @desc 获取sessionStorage */
export const getSessionStorage = (key: string) =>
  getStorage(key, "sessionStorage");

/** @desc 正常获取localStorage */
export const getLocalStorageNormal = (key: string) => {
  const data = localStorage.getItem(key);
  if (data && checkIsJSON(data)) {
    // 转换
    const obj: TStorageItem = JSON.parse(data);
    const { value } = obj;
    return value;
  }
  return null;
};
