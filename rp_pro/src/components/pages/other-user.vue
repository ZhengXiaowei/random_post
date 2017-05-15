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
            <!--<mu-flat-button type="button" class="rp-edit" label="关注" backgroundColor="#757575" color="#fff" @click="editIntro" />-->
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
                opName: 'TA的粉丝',
                iconClass: 'icon-iconfontfensi',
                path: 'other-user/fans'
            }, {
                opName: 'TA的关注',
                iconClass: 'icon-guanzhu',
                path: 'other-user/user-concern'
            }, {
                opName: 'TA的发帖',
                iconClass: 'icon-tiezi',
                path: 'other-user/user-posts'
            }, {
                opName: 'TA的回复',
                iconClass: 'icon-xiaoxizhongxin',
                path: 'other-user/user-replay'
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