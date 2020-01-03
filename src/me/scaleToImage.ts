import html2canvas from 'html2canvas'

export function DscaleToImage(qr) {
    /* 直接传入canvas 转换成图片 （qrcode 内容就是canvas所以直接传入qrcode就行了）
    const a = document.createElement('a');
    let image = new Image();
    image.src = qr.toDataURL("image/png");
    a.href = image.src;
    a.download = "二维码";
    a.click();
    */

    //传入页面转换成图片（页面先转换成canvas 然后再转换成图片）
    html2canvas(qr, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
        var dataUrl = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = "invitationCode";
        a.click();

    });
}

export async function scaleToImage(qr: any): Promise<string> {
    /* 直接传入canvas 转换成图片 （qrcode 内容就是canvas所以直接传入qrcode就行了）
    const a = document.createElement('a');
    let image = new Image();
    image.src = qr.toDataURL("image/png");
    a.href = image.src;
    a.download = "二维码";
    a.click();
    */
    //var result = "";
    //传入页面转换成图片（页面先转换成canvas 然后再转换成图片）
    let canvas = await html2canvas(qr, { scale: 2, logging: false, useCORS: true });
    var dataUrl = canvas.toDataURL();
    return dataUrl;
    //result = img2base64(dataUrl, "anonymous");
    //return result;
}

export async function scaleToImage_text(qr) {
    let canvas = await html2canvas(qr, { scale: 2, logging: false, useCORS: true });
    let image = new Image();
    image.src = canvas.toDataURL("image/png");

    return image;
    /* 直接传入canvas 转换成图片 （qrcode 内容就是canvas所以直接传入qrcode就行了）
    const a = document.createElement('a');
    let image = new Image();
    image.src = qr.toDataURL("image/png");
    a.href = image.src;
    a.download = "二维码";
    a.click();
    */
    //传入页面转换成图片（页面先转换成canvas 然后再转换成图片）
    //let content = img2base64(qr, "anonymous");
    //var blob = new Blob([content], { type: "image/jpeg" });
    //saveAs(blob, "file123.jpg");//saveAs(blob,filename)


}

//保存成文件（有错误先不研究了）
/*
export function dataUrltoFile(dataurl, filename) {

    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    console.info('mime', mime);
    const bstr = atob(arr[1]);
    let n = bstr.length
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new file([u8arr], filename, { type: mime })
}
*/
/**
 * 图片转base64格式
 */
export function img2base64(url, crossOrigin) {
    return new Promise(resolve => {
        const img = new Image();

        img.onload = () => {
            const c = document.createElement('canvas');

            c.width = img.naturalWidth;
            c.height = img.naturalHeight;

            const cxt = c.getContext('2d');

            cxt.drawImage(img, 0, 0);
            // 得到图片的base64编码数据
            resolve(c.toDataURL('image/png'));
        };

        crossOrigin && img.setAttribute('crossOrigin', crossOrigin);
        img.src = url;
    });
}

/**
 * 在本地进行文件保存
 * @param  {String} data     要保存到本地的图片数据
 * @param  {String} filename 文件名
 */
/*
function saveFile(data, filename) {
    const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}
*/