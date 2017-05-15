<template>
    <div class="rp-posts rp-common-box" :style="{height:autoHeight}" ref="post_container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
        <!--<vue-pull-refresh :on-refresh="onRefresh">-->
        <div class="posts-item-box" ref="item_container">
            <rp-post-item class="sliderIn" v-for="(item,index) in postList" :key="index" :itemData="item"></rp-post-item>
        </div>
        <!--</vue-pull-refresh>-->
    
        <mu-infinite-scroll :loadingText="loadingText" :scroller="trigger" :loading="loading" @load="loadMore" />
    </div>
</template>
<script>
import RpPostItem from '../use-components/post-item'
import VuePullRefresh from 'vue-pull-refresh'
export default {
    components: {
        RpPostItem,
        VuePullRefresh
    },
    mounted() {
        useVelocity('sliderIn').animationType('transition.slideLeftBigIn', { stagger: 400 })
        this.trigger = this.$refs.post_container
    },
    created() {
        this.$store.watch((state) => {
            return state.bodyHeight
        }, () => {
           this.autoHeight = this.$store.getters.showBodyHeight + 'px'
        })
        this.autoHeight = this.$store.getters.showBodyHeight + 'px'
    },
    data() {
        return {
            refreshing: false,
            loading: false,
            loadingText: '小威正在努力加载...',
            trigger: null,
            autoHeight: '',
            loadList: [{
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述这里是文字描述这里是文字描述这里是文字描述这里是文字描述这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:1,
                postId:1
            }, {
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧2',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:2,
                postId:2
            }, {
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧3',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:3,
                postId:3
            }],
            postList: [{
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述这里是文字描述这里是文字描述这里是文字描述这里是文字描述这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:4,
                postId:4
            }, {
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧2',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:5,
                postId:5
            }, {
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧3',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:6,
                postId:6
            }, {
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧3',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:7,
                postId:7
            }, {
                userImg: require('../../assets/user.jpg'),
                userName: '慕小牧3',
                postTime: '2017-04-02 14:18:32',
                postTitle: '为什么这个bug无法修复?',
                content: '这里是文字描述',
                collectNum: 120,
                msgNum: 12,
                markeNum:26,
                userId:8,
                postId:8
            }]
        }
    },
    methods: {
        onRefresh() {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
        },
        refresh() {
            this.refreshing = true
            setTimeout(() => {
                this.refreshing = false
            }, 1000)
        },
        loadMore() {
            this.loading = true
            setTimeout(() => {
                // for (let i = 0; i < this.loadList.length; i++) {
                //     this.postList.push(this.loadList[i])
                // }
                this.loading = false
            }, 3000)
        }

    }
}
</script>

<style lang="css">
.rp-posts {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    user-select: none;
}
</style>