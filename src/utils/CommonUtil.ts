export default {};
// 检查是否是json数据
export const checkIsJSON = (str: any) => {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      return typeof obj === "object" && obj;
    } catch (e) {
      return false;
    }
  }
  return false;
};
