let searchbar,searchIcon;
let list_item_template,list_item_node;
window.onload=function(){
    console.log("something hpasfs");
    searchbar=document.querySelector('.search-bar');
    searchIcon=document.querySelector('.search-icon');
    list_item_template=document.querySelector('.list-item-template');
    list_item_node=document.importNode(list_item_template.content,true);
    addTopSites();
    searchIcon.addEventListener('click',()=>{
        newTab.search();
    });
  
    searchbar.addEventListener('keyup',e=>{
       if(e.which==13){
           newTab.search();
       }
    });
}

let newTab={
    search:function(){
       let query=searchbar.value;
       console.log("called");
       if(query.trim()!=''){
        window.location.href=`https://www.google.com/search?q=${query}`
       }
    }
}
function addTopSites(){
    chrome.topSites.get(topSites=>{
        topSites=topSites.slice(0,8);
        let favicon_urls=[];
        topSites.forEach(site=>{
            console.log(site);
            let url = new URL(site.url);
            let faviconUrl = `http://favicongrabber.com/api/grab/${url.host}?pretty=true`;
            favicon_urls.push(faviconUrl);
            let node=list_item_node.cloneNode(true);
            node.querySelector('.label').textContent=site.title!=""?site.title:site.url;
            node.querySelector('.list-item').title=site.title; 
            node.querySelector('.list-item').href=site.url; 
            let logo=node.querySelector('.site-icon');
          chrome.storage.local.get([faviconUrl],(ob)=>{
        
            if(ob[faviconUrl]){
              logo.src=ob[faviconUrl];
            }else{
            fetch(faviconUrl)
              .then(res => res.json())
              .then(data => {
                let src = data.icons[0].src || undefined;
                if (src) {
                  fetch(src).then(res => res.arrayBuffer()).then(buffer => {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = arrayBufferToBase64(buffer);
                    logo.src = base64Flag + imageStr;
                    //set the image here
                    chrome.storage.local.set({
                      [faviconUrl]: base64Flag + imageStr
                    });
                  }).catch(err => err);

                }
              })
              .catch(err => err);
            }
        })

            document.querySelector('.top-sites').appendChild(node);
        })
    })
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  
  function removeUnUsedCache(favicon_urls){
     chrome.storage.local.get((cache=>{
        let cached_urls=Object.keys(cache);
        cached_urls.forEach(url => {
            if(!favicon_urls.includes(url)){
              chrome.storage.local.remove(url);
  
            }
        });
  
     }))
  }
