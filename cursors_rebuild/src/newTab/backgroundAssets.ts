import wallpaper1 from "./backgrounds/wallpaper_1.jpg";
import wallpaper2 from "./backgrounds/wallpaper_2.jpg";
import wallpaper3 from "./backgrounds/wallpaper_3.jpg";
import wallpaper4 from "./backgrounds/wallpaper_4.jpg";
import wallpaper5 from "./backgrounds/wallpaper_5.jpg";
import wallpaper6 from "./backgrounds/wallpaper_6.jpg";

// gifs
import gif1 from "./backgrounds/gif_1.gif";


export const wallpapers = [
    {
        key: 1,
        value: wallpaper1,
    },
    {
        key: 2,
        value: wallpaper2,
    },
    {
        key: 3,
        value: wallpaper3,
    },
    {
        key: 4,
        value: wallpaper4,
    },
    {
        key: 5,
        value: wallpaper5,
    },
    {
        key: 6,
        value: wallpaper6,
    }
];

export const gifs = [
    {
        key: 1,
        value: gif1,
    },
];

export const gradients = [

    {
        key: 1,
        value: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);'
    },
    {
        key: 2,
        value: 'linear-gradient(132deg, #F4D03F 0%, #16A085 100%);'
    },
    {
        key: 3,
        value: 'linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%);'
    },
    {
        key: 4,
        value: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);'
    }
];

export const ASSET_TYPES = {
    IMAGE:0,
    GIF: 1,
    GRADIENT:2
};
