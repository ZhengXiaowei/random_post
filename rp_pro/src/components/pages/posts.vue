<template>
    <div class="rp-posts rp-common-box" :style="{height:autoHeight}" ref="post_container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
        <div class="posts-item-box" ref="item_container">
            <rp-post-item class="sliderIn" v-for="(item,index) in postList" :key="index" :itemData="item" :userInfo="item.user"></rp-post-item>
        </div>
        <mu-infinite-scroll :loadingText="loadingText" :scroller="trigger" :loading="loading" @load="loadMore" />
        <transition @enter="showLoading" @leave="hideLoading">
            <loading-box class="show-loading t-center" v-show="isLoading" loadingText="努力加载ing.."></loading-box>
        </transition>
    </div>
</template>
<script>
import RpPostItem from '../use-components/post-item'
import LoadingBox from '../use-components/loading'
import VuePullRefresh from 'vue-pull-refresh'
export default {
    components: {
        RpPostItem,
        LoadingBox,
        VuePullRefresh
    },
    mounted() {
        this.getDataBeforeEnter()
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
    watch: {
        postList(newVal) {
            this.$nextTick(() => {
                useVelocity('sliderIn').animationType('transition.slideLeftBigIn', { stagger: 400 })
            })
        }
    },
    data() {
        return {
            refreshing: false,
            loading: false,
            isLoading: false,
            loadingText: '小威正在努力加载...',
            trigger: null,
            autoHeight: '',
            loadList: [],
            postList: []
        }
    },
    methods: {
        getDataBeforeEnter() {
            //获取帖子列表
            this.isLoading = true
            this.$http.get('/api/communityList').then((res) => {
                if (res.data.errCode === 0) {
                    let getRes = res.data.data
                    this.postList = getRes.latestList.data
                    this.isLoading = false
                }
            })
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
        },
        showLoading() {
            useVelocity('show-loading').animationType('transition.expandIn')
        },
        hideLoading() {
            useVelocity('show-loading').animationType('transition.expandOut', { duration: 650, delay: 650 })
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