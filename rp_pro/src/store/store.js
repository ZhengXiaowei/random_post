import Vue from 'vue'
import Vuex from 'vuex'

import commonJs from '../common'
const commonMehods = new commonJs()

Vue.use(Vuex)

const state = {
    isLogin: true,
    user_id: commonMehods.getStr('user_id', 0),
    token: commonMehods.getStr('token', 0),
    showFooterBtn: true,
    showCurBottom: 'index',
    showBackBtn: false,
    showAdd: true,
    showMenuList: false,
    bodyHeight: 0,
    showScrollHeader: true,
    getInitTouchNum: 0,
    showHeader: true,
    isFixed: false,
    mainScrollVal: 0,
    pageTitle: '首页',
    imgList: [],
    isLoading: false,
    getImgText: ''
}

const mutations = {
    toggleMenu(state) {
        state.showMenuList = !state.showMenuList
    },
    hideOperateBtn(state) {
        state.showFooterBtn = false
        state.showBackBtn = true
        state.showAdd = false
    },
    showOperateBtn(state) {
        state.showFooterBtn = true
        state.showBackBtn = false
        state.showAdd = true
    },
    getCurPage(state, curPage) {
        state.showCurBottom = curPage.curPage
    },
    getBodyHeight(state) {
        // state.showFooterBtn ? state.bodyHeight = document.body.clientHeight - 101 : state.bodyHeight = document.body.clientHeight - 45
        state.bodyHeight = document.body.clientHeight - 101
    },
    setBodyHeight(state, decrementHeight) {
        state.bodyHeight = document.body.clientHeight - decrementHeight
    },
    setUserId(state, userid) {
        state.user_id = userid
    },
    setLoginToken(state, token) {
        state.token = token
    },
    getLoginStatus(state) {
        state.user_id === '' ? state.isLogin = false : state.isLogin = true
    },
    toggleScrollHeader(state) {
        state.showScrollHeader = !state.showScrollHeader
    },
    setTouchNum(state, touchNum) {
        state.getInitTouchNum = touchNum
    },
    setShowHeader(state, showBoolean) {
        state.showHeader = showBoolean
    },
    setFixedState(state, fixedBoolean) {
        state.isFixed = fixedBoolean
    },
    getMainBodyScroll(state) {
        state.mainScrollVal = document.getElementsByClassName('rp-common-box').length > 0 ? document.getElementsByClassName('rp-common-box')[0].scrollTop : ''
    },
    setTitle(state, title) {
        state.pageTitle = title
    },
    pushImg(state, imgBase64) {
        state.imgList.push(imgBase64)
    },
    clearImgList(state) {
        state.imgList = []
    },
    switchLoading(state, loadingBoolean) {
        state.isLoading = loadingBoolean
    },
    setImgText(state, getImgText) {
        state.getImgText = getImgText
    }
}

const actions = {
    toggleMenu: ({ commit }) => {
        commit('toggleMenu')
    },
    hideOperateBtn: ({ commit }) => {
        commit('hideOperateBtn')
    },
    showOperateBtn: ({ commit }) => {
        commit('showOperateBtn')
    },
    getCurPage: ({ commit }, curPage) => {
        commit('getCurPage', curPage)
    },
    getBodyHeight: ({ commit }) => {
        commit('getBodyHeight')
    },
    setBodyHeight: ({ commit }, decrementHeight) => {
        commit('setBodyHeight', decrementHeight)
    },
    getLoginStatus: ({ commit }) => {
        commit('getLoginStatus')
    },
    toggleScrollHeader: ({ commit }) => {
        commit('toggleScrollHeader')
    },
    setTouchNum: ({ commit }, touchNum) => {
        commit('setTouchNum', touchNum)
    },
    setShowHeader: ({ commit }, showBoolean) => {
        commit('setShowHeader', showBoolean)
    },
    setFixedState: ({ commit }, fixedBoolean) => {
        commit('setFixedState', fixedBoolean)
    },
    getMainBodyScroll: ({ commit }) => {
        commit('getMainBodyScroll')
    },
    setTitle: ({ commit }, titleName) => {
        commit('setTitle', titleName)
    },
    pushImg: ({ commit }, imgBase64) => {
        commit('pushImg', imgBase64)
    },
    clearImgList: ({ commit }) => {
        commit('clearImgList')
    },
    switchLoading: ({ commit }, loadingBoolean) => {
        commit('switchLoading', loadingBoolean)
    },
    setImgText: ({ commit }, getImgText) => {
        commit('setImgText', getImgText)
    }
}

const getters = {
    isLogin() {
        return state.isLogin
    },
    getUserId() {
        return state.user_id
    },
    getToken() {
        return state.token
    },
    showMenuList() {
        return state.showMenuList
    },
    showFooterBtn() {
        return state.showFooterBtn
    },
    showAdd() {
        return state.showAdd
    },
    showBackBtn() {
        return state.showBackBtn
    },
    showCurBottom() {
        return state.showCurBottom
    },
    showBodyHeight() {
        return state.bodyHeight
    },
    showScrollHeader() {
        return state.showScrollHeader
    },
    getInitTouchNum() {
        return state.getInitTouchNum
    },
    showHeader() {
        return state.showHeader
    },
    isFixed() {
        return state.isFixed
    },
    getMainScrollVal() {
        return state.mainScrollVal
    },
    getPageTitle() {
        return state.pageTitle
    },
    getImgList() {
        return state.imgList
    },
    loadingState() {
        return state.isLoading
    },
    getImgText() {
        return state.getImgText
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})