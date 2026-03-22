import { cld } from "./cloudinary";

export const getBackendImgURL = (imgPath) => {
    const image = cld.image(imgPath);
    return image.toURL();
};

export const getBackendVideoURL = (videoPath) => {
    const video = cld.video(videoPath);
    return video.toURL();
}