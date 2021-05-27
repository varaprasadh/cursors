
export function arrayBufferToBase64(buffer:(ArrayBuffer|null)) {
    if(!buffer) return null;
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
