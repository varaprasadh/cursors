chrome.browserAction.onClicked.addListener(()=>{
    chrome.tabs.create({
        url: "http://www.cursors.anits.edu.in/"
    })
});

chrome.runtime.onInstalled.addListener(obj=>{
    if(obj.reason==="install"){
        chrome.storage.sync.set({type:"default",bgurl:"./images/bg/wallpaper5.jpg"});
    }
})
