// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

import 'velocity-animate/velocity.js'
import 'velocity-animate/velocity.ui.js'

import commonJs from './common.js'
import './useAnimation.js'

import Tesseract from 'tesseract.js'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题

import './assets/static/fonts/fonts.css'

import axios from 'axios'

Vue.use(MuseUI)

const commonMethods = new commonJs()

Vue.prototype.commonMethods = commonMethods
Vue.prototype.scannerImgToText = Tesseract
Vue.prototype.$http = axios
// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// Vue.prototype.useVelocity = useVelocity

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})