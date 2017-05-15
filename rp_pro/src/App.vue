<template>
    <div id="app">
        <transition name="header">
            <div class="rp-header trans" :class="{'fixed-header':isFixed}" v-show="showHeader">
                <mu-appbar :title="pageTitle" class="rp-header-title">
                    <mu-icon-button icon="keyboard_arrow_left" slot="left" class="rp-back-btn" v-show="showBack" @click="backPrevPage" />
                </mu-appbar>
            </div>
        </transition>
        <!--@touchmove="getTouchMoveNum" @touchstart="getInitTouchNum"-->
        <div class="rp-container" @touchmove="getTouchMoveNum" @touchstart="getInitTouchNum">
            <!--<transition appear @enter="pageEnter" @leave="pageLeave">-->
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
            <!--</transition>-->
        </div>
        <div class="rp-fixed-menu" v-show="showAdd">
            <div class="rp-fixed-add p-fixed" :class="[openMenu ? 'rp-fixed-add-open' : 'rp-fixed-add-close']">
                <mu-float-button secondary @click="switchMenu" />
            </div>
            <div class="rp-fixed-child-item p-fixed rp-post">
                <mu-float-button icon="add" secondary mini to="/add-questions" @click.native="switchMenu"></mu-float-button>
            </div>
            <div class="rp-fixed-child-item p-fixed rp-bookmark">
                <mu-float-button icon="bookmark" secondary mini to="/user/user-mark" @click.native="switchMenu"></mu-float-button>
            </div>
            <div class="rp-fixed-child-item p-fixed rp-share">
                <mu-float-button icon="forum" secondary mini to="/user/user-msg" @click.native="switchMenu"></mu-float-button>
            </div>
        </div>
        <div class="rp-footer" v-show="showFooter">
            <mu-paper class="p-fixed rp-footer-box">
                <mu-bottom-nav :value="getCurBottom" shift>
                    <mu-bottom-nav-item value="index" title="首页" icon="home" to="/index" />
                    <mu-bottom-nav-item value="posts" title="发现" icon="explore" to="/posts" />
                    <mu-bottom-nav-item value="user" title="我的" icon="person" to="/user" />
                </mu-bottom-nav>
            </mu-paper>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bottomNav: 'index', //存放到vuex中
            bottomSheet: false,
            showMenuList: false,
            toggleIcon: 'add',
            openMenu: false,
            userImg: require('./assets/user.jpg'),
        }
    },
    created() {
        this.$store.watch((state) => {
            return state.mainScrollVal
        }, () => {
            if (this.$store.getters.getMainScrollVal < 100) {
                // this.$store.dispatch('setFixedState', false)
                // this.$store.dispatch('setBodyHeight', 101)
            }
        })
    },
    mounted() {
        // console.log(this.$store.getters.showScrollHeader)
    },
    computed: {
        showFooter() {
            return this.$store.getters.showFooterBtn
        },
        showAdd() {
            return this.$store.getters.showAdd
        },
        showBack() {
            return this.$store.getters.showBackBtn
        },
        getCurBottom() {
            return this.$store.getters.showCurBottom
        },
        showHeader() {
            return this.$store.getters.showHeader
        },
        isFixed() {
            return this.$store.getters.isFixed
        },
        pageTitle(){
            return this.$store.getters.getPageTitle
        }
    },
    methods: {
        switchMenu() {
            this.$store.dispatch('toggleMenu')
            let isOpen = this.$store.getters.showMenuList
            if (isOpen) {
                this.openMenu = true
                useVelocity('rp-post').animationType({ bottom: '26%', right: '8%' }, { easing: 'easeInOutCubic' })
                useVelocity('rp-bookmark').animationType({ bottom: '20%', right: '24%' }, { easing: 'easeInOutCubic', delay: 100 })
                useVelocity('rp-share').animationType({ bottom: '10%', right: '28%' }, { easing: 'easeInOutCubic', delay: 200 })
            } else {
                this.openMenu = false
                this.toggleIcon = 'add'
                useVelocity('rp-fixed-child-item').animationType({ bottom: '13.5%', right: '5.8%' }, { easing: 'easeInOutCubic' })
            }
        },
        backPrevPage() {
            window.history.back()
        },
        pageEnter(el, done) {
            useVelocity(el).animationType('transition.swoopIn', { duration: 650, complete: done })
        },
        pageLeave(el, done) {
            useVelocity(el).animationType('transition.swoopOut', { duration: 650, complete: done })
        },
        getInitTouchNum(e) {
            this.$store.dispatch('setTouchNum', e.targetTouches[0].clientY)
        },
        //有瑕疵,惯性滚动的时候无法做滚动条判断
        getTouchMoveNum(e) {
            this.$store.dispatch('getMainBodyScroll')
            let touchInit = this.$store.getters.getInitTouchNum
            let touchMoveNum = e.targetTouches[0].clientY
            if (touchInit - touchMoveNum > 60) {
                // this.$store.dispatch('setFixedState', true)
                // this.$store.dispatch('setShowHeader', false)
                // this.$store.dispatch('setBodyHeight', 56)
            } else if (touchInit - touchMoveNum < -60) {
                // this.$store.dispatch('setShowHeader', true)
            }
        },
        // hideTop() {
        //     setTimeout(() => {
        //         console.log('click')
        //         document.getElementsByClassName('rp-common-box')[0].scrollTop < 100 ? this.showHeader = true : this.showHeader = false
        //     }, 3000)
        // }
    }
}
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}




















/* HTML5 display-role reset for older browsers */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

body {
    line-height: 1;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

a {
    color: #fff;
    text-decoration: none;
}

body {
    background: #fff;
    font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 14px;
    color: #444;
}

html,
body {
    height: 100%;
}

img {
    width: 100%;
    max-width: 100%;
}

.f-left {
    float: left;
}

.f-right {
    float: right;
}

.t-center {
    text-align: center;
}

.t-left {
    text-align: left;
}

.t-right {
    text-align: right;
}

.d-none {
    display: none;
}

.d-line {
    display: inline;
}

.db-line {
    display: inline-block;
}

.p-rel {
    position: relative;
}

.p-abs {
    position: absolute;
}

.p-fixed {
    position: fixed;
}

.trans {
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.clear {
    clear: both;
    *zoom: 1
}

.clear:after {
    content: '\20';
    clear: both;
    *zoom: 1;
    display: block;
    height: 0
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
}

@font-face {
    font-family: rp_font;
    src: url('http://opbev716k.bkt.clouddn.com/HYQiHei-35S.otf')
}

.rp-footer-box {
    width: 100%;
    bottom: 0px;
}

.rp-fixed-add {
    bottom: 12%;
    right: 4%;
    z-index: 99;
}

.rp-fixed-add-open::after,
.rp-fixed-add-close::after {
    content: '';
    display: block;
    width: 66px;
    height: 66px;
    position: absolute;
    top: -5px;
    left: -5px;
    background: #ff5252;
    opacity: 0.7;
    border-radius: 50%;
    z-index: -1;
}

.rp-fixed-add-open::after {
    animation: show-shadow-cricle .5s ease-in-out
}

.rp-fixed-add-close::after {
    transform: scale(0);
    animation: hide-shadow-cricle .5s ease-in-out
}

@keyframes show-shadow-cricle {
    0% {
        transform: scale(0)
    }
    50% {
        transform: scale(1.2)
    }
    100% {
        transform: scale(1)
    }
}

@keyframes hide-shadow-cricle {
    0% {
        transform: scale(1)
    }
    50% {
        transform: scale(1.2)
    }
    100% {
        transform: scale(0)
    }
}

.rp-fixed-child-item {
    z-index: 9;
    right: 5.8%;
    bottom: 13.5%;
    /*right: 20px;
    bottom: 14%;*/
}

.rp-header-title.mu-appbar {
    height: 45px;
}

.mu-appbar .mu-appbar-title {
    line-height: 45px;
}

.mu-appbar-title span {
    font-size: 14px;
    font-family: "Microsoft Yahei"
}

.rp-header-title .rp-back-btn {
    position: absolute;
    left: 0%;
}

.rp-footer {
    height: 56px;
}

.fixed-header {
    position: fixed;
    top: 0;
    width: 100%;
    opacity: .5;
    z-index: 999;
}


/**
    修改原有框架的css
**/
.item-title .mu-card-header-title{
    padding-right:0;
}
















/**
    顶部导航显示隐藏
**/

.header-enter-active {
    /*transition: all .5s;*/
    animation: show-header .5s linear
}

.header-leave-active {
    /*transition: all .5s;*/
    animation: hide-header .5s linear
}

@keyframes show-header {
    0% {
        transform: translateY(-45px)
    }
    100% {
        transform: translateY(0)
    }
}

@keyframes hide-header {
    0% {
        transform: translateY(0)
    }
    100% {
        transform: translateY(-45px)
    }
}
</style>