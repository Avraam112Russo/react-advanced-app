
// enable import cls.btn from "./somestyle.module.scss
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}
// declaration.d.ts
// declare module '*.scss' {
//     const content: Record<string, string>;
//     export default content;
// }
// imports for typescript
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
declare const __IS_DEV__: boolean ;