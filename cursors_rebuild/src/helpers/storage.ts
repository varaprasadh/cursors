/// <reference types="chrome"/>

export async function getObjectFromStorageLocal(key: string) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get([key], obj => {
                resolve(obj);
            })
        } catch (error) {
            reject(error);
        }
    })
};
