<template>
    <div class="rp-user">
        <div class="rp-user-info p-rel">
            <div class="user-img">
                <img :src="userInfo.userImg" :alt="userInfo.nickName" />
            </div>
            <div class="user-notice user-show-data">
                <p>{{ userInfo.noticeNum }}<span>关注</span></p>
            </div>
            <div class="user-funs user-show-data">
                <p>{{ userInfo.funsNum }}<span>粉丝</span></p>
            </div>
        </div>
        <div class="user-info-box">
            <!--<span>{{ userInfo.sex }}</span>-->
            <p>{{ userInfo.nickName }}<span :class="[userInfo.sex?'icon-men':'icon-women']"></span></p>
            <div class="user-intro">
                <p v-if="userInfo.userIntro===''" class="system-write">这孩子很懒，什么都不肯留一句。怪我咯？</p>
                <p v-else>{{ userInfo.userIntro }}</p>
            </div>
            <mu-flat-button type="button" class="rp-edit" label="编辑" backgroundColor="#757575" color="#fff" @click="editIntro" />
        </div>
        <div class="user-operations">
            <ul>
                <router-link class="user-op-item" tag="li" v-for="(opItem,i) in userOpts" :key="i" :to="{path:'/'+opItem.path}">
                    <p><i :class="opItem.iconClass"></i>{{opItem.opName}}<span class="icon-chevron-right"></span></p>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                userImg: require('../../assets/userimg.png'),
                nickName: '慕小牧',
                sex: 1,
                noticeNum: 94,
                funsNum: 102,
                userIntro: '这里放置个人简介说明'
            },
            userOpts: [{
                opName: '我的粉丝',
                iconClass: 'icon-iconfontfensi',
                path: 'user/fans'
            }, {
                opName: '我的关注',
                iconClass: 'icon-guanzhu',
                path: 'user/user-concern'
            }, {
                opName: '我的发帖',
                iconClass: 'icon-tiezi',
                path: 'user/user-posts'
            }, {
                opName: '我的浏览',
                iconClass: 'icon-zuji',
                path: 'user/user-history'
            }, {
                opName: '我的设置',
                iconClass: 'icon-shezhi',
                path: 'user/user-setting'
            }]
        }
    },
    mounted () {
        useVelocity('user-notice').animationType('transition.bounceLeftIn')
        useVelocity('user-funs').animationType('transition.bounceRightIn')
        useVelocity('user-img').animationType('transition.bounceDownIn')
        useVelocity('user-info-box').animationType('transition.slideUpIn')
        useVelocity('user-op-item').animationType('transition.slideLeftBigIn', { stagger: 400 })
    },
    methods: {
        editIntro() {

        }
    }
}
</script>
<style lang="css">
.rp-user-info {
    padding-top: 20px;
}

.user-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0px auto 10px;
    position: relative;
}

.user-img::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #eaeaed;
    z-index: -1;
}

.user-show-data {
    position: absolute;
    width: 80px;
    height: 40px;
    top: 50%;
    margin-top: -10px;
    line-height: 40px;
}

.user-notice {
    left: 5%;
}

.user-funs {
    right: 5%;
}

.user-show-data p {
    font-size: 18px;
    color: #000;
}

.user-show-data span {
    font-size: 14px;
    color: #757575;
}

.user-info-box {
    width: 90%;
    margin: 20px auto 0;
    font-size: 18px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.user-intro p {
    font-size: 14px;
    color: #757575;
    /*padding: 0 20px;*/
    line-height: 16px;
    margin-top: 10px;
    text-align: left;
}

.rp-edit.mu-flat-button {
    margin-top: 10px;
    height: 32px;
    line-height: 32px;
}

.user-intro .system-write {
    color: #ddd;
}

.user-operations {
    width: 90%;
    margin: 0 auto;
    padding: 10px 0;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.user-op-item {
    line-height: 34px;
    color: #898989;
    font-size: 16px;
    padding: 0 10px;
}


.user-op-item i {
    font-size: 22px;
    margin-right: 10px;
}

.user-op-item span {
    float: right;
}

.icon-women,
.icon-men {
    font-size: 22px;
    vertical-align: middle;
}

.icon-men {
    color: #39b4ff;
}

.icon-women {
    color: #ea6f91;
}
</style>