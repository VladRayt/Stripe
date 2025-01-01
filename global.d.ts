// global.d.ts
// Оголошення типів для різних форматів зображень
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

// Спеціальне оголошення для SVG файлів, що дозволяє використовувати їх як React компоненти
declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}