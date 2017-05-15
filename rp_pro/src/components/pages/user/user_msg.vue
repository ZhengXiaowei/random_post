<template>
    <div class="user-msg">
        <div class="msg-type">
            <ul class="clear">
                <li class="f-left m-type-item" 
                    :class="{'cur':msgTypeId===curIndex}" 
                    v-for="(msgType,msgTypeId) in msgType"
                    @click="getCur(msgTypeId)">{{ msgType.typeName }}</li>
            </ul>
        </div>
        <div class="msg-type-list">
            <div class="msg-type-item" v-for="(typeItem,typeIndex) in typeList">
                <mu-card>
                    <mu-card-header class="reply-user-head" :title="typeItem.userName" :subTitle="typeItem.replyTime" @click.native="getThisUser(typeItem.userId)">
                        <mu-avatar :src="typeItem.userImg" slot="avatar" />
                    </mu-card-header>
                    <div class="reply-c-box">
                        <p><span>回复 我：</span>{{ typeItem.replyContent }}</p>
                    </div>
                    <div class="reply-prev-box">
                        <p><span>我的评论：</span>{{ typeItem.prevReplyContent }}</p>
                    </div>
                    <div class="reply-operations">
                        <span @click="getPost(typeItem.postId)"><i class="icon-dingwei"></i>查看帖子详情</span>
                        <span class="nomr" @click="replyComment(typeItem.postId,typeItem.userId,typeItem.replyContent,typeItem.userName)"><i class="icon-huifu"></i>回复评论</span>
                    </div>
                </mu-card>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                curIndex: 0,
                msgType: [{
                    typeName: '回复我的',
                    typeId: 1
                }, {
                    typeName: '@我的',
                    typeId: 2
                }, {
                    typeName: '我的私信',
                    typeId: 3
                }],
                typeList: [{
                    postId: 23,
                    userId: 12,
                    replyId: 123,
                    userName: '膜法师',
                    userImg: require('../../../assets/userimg.png'),
                    replyTime: '2017-03-20',
                    replyContent: '你之前说的那些代码,能给个详细的注释吗,我理解起来有些费劲..谢谢大神了!',
                    prevReplyContent: 'var a=ccc;if(a){console.log(a)}else console.log(a.split(""))'
                }, {
                    postId: 24,
                    userId: 14,
                    replyId: 22,
                    userName: '慕小牧',
                    userImg: require('../../../assets/userimg.png'),
                    replyTime: '2017-03-20',
                    replyContent: '你之前说的那些代码,能给个详细的注释吗,我理解起来有些费劲..谢谢大神了!',
                    prevReplyContent: 'var a=ccc;if(a){console.log(a)}else console.log(a.split(""))'
                }]
            }
        },
        methods: {
            getCur(i) {
                this.curIndex = i
            },
            getThisUser(uid) {
                this.$router.push({
                    path: '/otheruser/' + uid
                })
            },
            getPost(pid) {
                this.$router.push({
                    path: '/posts/post-details/' + pid
                })
            },
            replyComment(pid, uid, rcontent, uname) {
                this.$router.push({
                    path: '/posts/reply-user/' + uid,
                    query: {
                        u: uname,
                        c: rcontent,
                        redirect: '/posts/post-details/' + pid
                    }
                })
            }
        },
        mounted() {
            useVelocity('msg-type-item').animationType('transition.slideLeftBigIn', {
                stagger: 400
            })
        }
    }
</script>

<style lang="css" scoped>
    .user-msg {
        margin: 0 10px;
        padding: 10px 0;
    }
    
    .m-type-item {
        width: calc(100% / 3);
        text-align: center;
    }
    
    .m-type-item.cur {
        color: #ff5252;
    }
    
    .msg-type-list {
        margin-top: 10px;
    }
    
    .reply-user-head {
        padding: 10px;
    }
    
    .msg-type-item {
        text-align: left;
        margin-bottom: 10px;
    }
    
    .reply-c-box {
        padding: 0 10px 10px;
        border-bottom: 1px solid #ddd;
    }
    
    .reply-c-box span,
    .reply-prev-box {
        color: #9d9ea1;
    }
    
    .reply-prev-box p {
        padding: 5px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .reply-operations {
        padding: 10px;
        text-align: right;
        color: #ff5252;
    }
    
    .reply-operations span {
        margin-right: 10px;
    }
    
    .reply-operations i {
        vertical-align: middle;
        font-size: 16px;
    }
    
    .reply-operations .nomr {
        margin-right: 0;
    }
</style>