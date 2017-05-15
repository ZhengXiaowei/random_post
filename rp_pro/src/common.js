import store from './store/store'
import Tesseract from 'tesseract.js'

let commonJs = ''
export default commonJs = function () { }

/**
 * 获取上传的图片(base64)
 */
commonJs.prototype.getUploadFile = function (files) {
    let fileArr = files
    let outFileArr = []
    for (let i = 0; i < fileArr.length; i++) {
        let reader = new FileReader(),
            _this = fileArr[i]
        reader.readAsDataURL(_this)
        reader.onload = function (e) {
            outFileArr.push(this.result)
        }
    }
    return outFileArr
}

/**
 * 使用第三方工具tesseract进行图片识别功能
 */
commonJs.prototype.recognizeImgCode = function (files, recognizeLang) {
    let file = files
    let reLang = recognizeLang === '' ? 'eng' : recognizeLang
    let resText = ''
    Tesseract.create({
        workerPath: 'https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/worker.js',
        langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
        corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
    }).recognize(file[0], {
        lang: reLang
    }).progress((msg) => {
        store.getters.loadingState === true ? '' : store.dispatch('switchLoading', true)
    }).then((res) => {
        store.dispatch('switchLoading', false)
        store.dispatch('setImgText', res.text)
    })
}

/**
 * 使用localstorage
 * type 0-localStorage 1-sessionStorage
 */
commonJs.prototype.setStr = function (key, word, type) {
    let str = '';
    type ? str = window.sessionStorage : str = window.localStorage
    str.setItem(key, word);
}

commonJs.prototype.getStr = function (key, type) {
    let str = '';
    type ? str = window.sessionStorage : str = window.localStorage
    return str.getItem(key);
}

commonJs.prototype.removeStr = function (key, type) {
    let str = '';
    type ? str = window.sessionStorage : str = window.localStorage
    str.removeItem(key);
}

commonJs.prototype.removeAllStr = function (type) {
    let str = '';
    type ? str = window.sessionStorage : str = window.localStorage
    str.clear();
}

/**
 * 获取 yyyy-mm-dd hh:mm:ss
 */
commonJs.prototype.getTimeToDetail = function (unixtime) {
    unixtime *= 1000;
    let date = new Date(unixtime);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y + M + D + h + m + s;
    // console.log(Y + M + D + h + m + s); //呀麻碟
}

/**
 * 获取yyyy-mm-dd
 */
commonJs.prototype.getTime = function (unixtime) {
    let t = new Date(parseInt(unixtime) * 1000).toLocaleString().replace(/[\u4e00-\u9fa5].*/, '').replace(/\//g, '-'),
        n = '';
    if (parseInt(t.split('-')[1]) < 10) {
        t = t.split('-');
        t[1] = '0' + t[1];
        if (parseInt(t[2].trim()) < 10) {
            t[2] = '0' + t[2];
        }
        for (let i = 0; i < t.length; i++) {
            n = t.join('-');
        }
        return n.trim();
    } else if (parseInt(t.split('-')[2]) < 10) {
        t = t.split('-');
        t[2] = '0' + t[2];
        for (let i = 0; i < t.length; i++) {
            n = t.join('-');
        }
        return n.trim();
    } else {
        return t;
    }
}

/**
 * 获取时间戳
 */
commonJs.prototype.getUnix = function (dateTime) {
    return Date.parse(dateTime) / 1000;
}