import { cld } from "./cloudinary";

export const getBackendImgURL = (imgPath) => {
    const image = cld.image(imgPath);
    return image.toURL();
};