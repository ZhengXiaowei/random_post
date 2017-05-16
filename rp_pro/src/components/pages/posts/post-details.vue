<template>
    <div class="rp-post-detail t-left p-rel" :style="{height:autoHeight}">
        <div class="rp-post-content" v-show="showPostDetails">
            <mu-card>
                <mu-card-header class="post-user p-rel" :title="userInfo.nickname" subTitle="楼主" @click.native="getThisUser(userInfo.id)">
                    <mu-avatar :src="userInfo.avatar" slot="avatar" />
                    <span class="rp-post-time p-abs">{{ postsDetails.updated_at }}</span>
                </mu-card-header>
                <div class="post-body">
                    <div class="post-title">
                        <h3>{{ postsDetails.title }}</h3>
                    </div>
                    <div class="post-content">
                        <p>{{ postsDetails.content }}</p>
                        <div class="post-img-box">
                            <ul>
                                <li class="post-img-item" v-for="(item,index) in postsDetails.imgs">
                                    <img :src="item" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </mu-card>
            <div class="rp-comment">
                <template v-if="postsComments.length>0" v-for="(item,index) in postsComments">
                    <comment-list :commentItem="item" :commentFloor="index+1"></comment-list>
                </template>
            </div>
            <div class="rp-reply-btns">
                <div class="btns-box">
                    <mu-flat-button label="回复楼主" class="reply-btn" @click="replayPosts(postsDetails.postId,postsDetails.postTitle)" />
                </div>
            </div>
        </div>
        <transition @enter="showLoading" @leave="hideLoading">
            <loading-box class="show-loading t-center" v-show="isLoading" loadingText="努力加载ing.."></loading-box>
        </transition>
    </div>
</template>
<script>
import CommentList from '../../use-components/comment-list'
import LoadingBox from '../../use-components/loading'
export default {
    components: {
        CommentList,
        LoadingBox
    },
    data() {
        return {
            postsDetails: {},
            userInfo: {},
            autoHeight: '',
            isLoading: false,
            showPostDetails: false,
            postsComments: []
        }
    },
    created() {
        this.$store.watch((state) => {
            return state.bodyHeight
        }, () => {
            this.autoHeight = this.$store.getters.showBodyHeight + 56 + 'px'
        })
        this.autoHeight = this.$store.getters.showBodyHeight + 56 + 'px'
    },
    watch: {
        postsDetails() {
            this.$nextTick(() => {
                useVelocity('post-body').animationType('transition.slideUpIn')
                useVelocity('btns-box').animationType('transition.bounceRightIn')
            })
        },
        userInfo() {
            this.$nextTick(() => {
                useVelocity('post-user').animationType('transition.bounceLeftIn')
            })
        }
    },
    methods: {
        getThisUser(uid) {
            this.$router.push({
                path: '/otheruser/' + uid
            })
        },
        replayPosts(pid, ptitle) {
            this.$router.push({
                path: '/posts/reply-posts/' + pid,
                query: {
                    postTitle: ptitle,
                    redirect: '/posts/post-details/' + pid
                }
            })
        },
        getDataBeforeEnter() {
            //根据id获取帖子详情
            this.showPostDetails = false
            this.isLoading = true
            this.$http.get('/api/communityDetail', {
                params: {
                    id: this.$route.params.postId
                }
            }).then((res) => {
                if (res.data.errCode === 0) {
                    let getRes = res.data.data
                    this.postsDetails = getRes
                    this.postsComments = getRes.comsList
                    this.userInfo = getRes.user
                    this.showPostDetails = true
                    this.isLoading = false
                }
            })
        },
        showLoading() {
            useVelocity('show-loading').animationType('transition.expandIn')
        },
        hideLoading() {
            useVelocity('show-loading').animationType('transition.expandOut', { duration: 650, delay: 650 })
        }
    },
    mounted() {
        this.getDataBeforeEnter()
    }
}
</script>

<style scoped>
.mu-card-header.post-user {
    padding: 10px;
}

.rp-post-detail {
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.rp-post-time {
    color: rgba(71, 74, 79, 0.54);
    bottom: 10px;
    right: 10px;
}

.post-body h3 {
    font-size: 16px;
    padding: 0 20px 20px;
    text-align: center;
    color: #000;
}

.post-content {
    padding: 0 20px 20px;
}

.post-content p {
    line-height: 24px;
    font-size: 14px;
}

.post-img-box {
    margin-top: 10px;
}

.rp-comment {
    margin-top: 10px;
}

.rp-reply-btns {
    height: 50px;
}

.btns-box {
    position: fixed;
    width: 100%;
    height: 50px;
    background: #464445;
    bottom: 0;
    text-align: center;
}

.reply-btn {
    background: #fff;
    width: 90%;
    margin-top: 6px;
}
</style>