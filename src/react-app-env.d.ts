/// <reference types="react-scripts" />
declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.mp4" {
  const src: string;
  export default src;
}
