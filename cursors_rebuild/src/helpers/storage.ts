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

// returns the entire object which was stored in chrome.storage.sync

export async function getObjectFromStorageSync() {
    return new Promise((resolve, reject) => {
        try{
            chrome.storage.sync.get((obj) => {
                resolve(obj);
            });
        }catch(error){
            reject(error);
        }
    })
}