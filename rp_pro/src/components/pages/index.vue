<template>
    <div class="rp-index">
        <div class="rp-post-type">
            <ul class="clear">
                <li class="f-left rp-type" :class="{'nav-span':index!=postType.length-1,'cur':index===curIndex}" v-for="(item,index) in postType" @click="getCurPost(index)">{{ item.typeName }}</li>
            </ul>
        </div>
        <div class="rp-posts-box rp-common-box" ref="index_post_container" :style="{height:autoHeight}">
            <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
            <!--<vue-pull-refresh :on-refresh="onRefresh">-->
            <template v-for="(item,index) in postList">
                <rp-post-item class="sliderIn" :key="index" :itemData="item" :userInfo="item.user"></rp-post-item>
            </template>
            <!--</vue-pull-refresh>-->
            <mu-infinite-scroll :loadingText="loadingText" :scroller="trigger" :loading="loading" @load="loadMore" />
        </div>
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
    created() {
        this.$store.watch((state) => {
            return state.bodyHeight
        }, () => {
            this.autoHeight = this.$store.getters.showBodyHeight - 39 + 'px'
        })
        this.autoHeight = this.$store.getters.showBodyHeight - 39 + 'px'
        //获取帖子列表
        this.$http.get('/api/communityList').then((res) => {
            if (res.data.errCode === 0) {
                let getRes = res.data.data.hotList
                this.postList = getRes
                // console.log(this.postList)
            }
        })
    },
    watch: {
        $route(to) {
            if (to.path.indexOf('index') != -1) {
                //路由变化后重新获取帖子列表
                this.$http.get('/api/communityList').then((res) => {
                    if (res.data.errCode === 0) {
                        let getRes = res.data.data.hotList
                        this.postList = getRes
                    }
                })
            }
        }
    },
    mounted() {
        useVelocity('sliderIn').animationType('transition.slideLeftBigIn', { stagger: 400 })
        this.trigger = this.$refs.index_post_container
    },
    data() {
        return {
            curIndex: 0,
            autoHeight: 'auto',
            refreshing: false,
            trigger: null,
            loading: false,
            loadingText: '小威正在努力加载...',
            postType: [{
                typeId: 1,
                typeName: '推荐'
            }, {
                typeId: 2,
                typeName: '心得'
            }, {
                typeId: 3,
                typeName: '求助'
            }, {
                typeId: 4,
                typeName: '关注'
            }],
            postList: []
        }
    },
    methods: {
        getCurPost(i) {
            this.curIndex = i
        },
        refresh() {
            this.refreshing = true
            setTimeout(() => {
                this.refreshing = false
            }, 1000)
        },
        onRefresh() {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
        },
        loadMore() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 2000)
        }
    }
}
</script>

<style lang="css" scoped>
.rp-post-type {
    line-height: 28px;
    margin: 5px 0;
    padding: 0 5px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 1px #eee;
}

.rp-type {
    width: 25%;
    color: #474a4f;
    position: relative;
}

.rp-type.cur {
    color: #ff5252;
}

.nav-span::after {
    content: '';
    display: inline-block;
    width: 1px;
    background: #474a4f;
    height: 16px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -8px;
}

.rp-posts-box {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    user-select: none;
}
</style>