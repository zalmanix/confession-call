declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.jpg" {
  const content: HTMLImageElement;
  export default content;
}

declare module "rn-update-apk";
