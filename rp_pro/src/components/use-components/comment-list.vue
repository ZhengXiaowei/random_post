<template>
    <div class="comment-item">
        <mu-card>
            <mu-card-header class="p-rel" :title="commentItem.userName" :subTitle="commentFloor+'楼'" @click.native="getThisUser(commentItem.userId)">
                <mu-avatar :src="commentItem.userImg" slot="avatar" />
                <span class="rp-post-time p-abs">{{ commentItem.commentTime }}</span>
            </mu-card-header>
            <div class="comment-content">
                <p>{{ commentItem.content }}</p>
                <div class="comment-img-box">
                    <ul>
                        <li class="comment-img-item" v-for="(item,index) in commentItem.contentImg">
                            <img :src="item.imgSrc" />
                        </li>
                    </ul>
                </div>
                <div class="comment-reply">
                    <div class="reply-item">
                        <p data-user="张三：" class="reply-user">我和同意你的说法</p>
                        <p class="reply-time">02-18</p>
                        <div class="replay-user-box">
                            <div class="reply-item">
                                <p data-user="李四 回复 张三：" class="reply-user">你这么说的话 我很赞同</p>
                                <p class="reply-time">02-18</p>
                            </div>
                            <div class="reply-item">
                                <p data-user="张三 回复 李四：" class="reply-user">不要学我说话</p>
                                <p class="reply-time">02-18</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="load-more-reply">
                <p>加载更多回复</p>
            </div>
            <div class="user-operators">
                <ul class="clear">
                    <li class="f-left op-item">
                        <!--<i class="icon-zan"></i>-->
                        <mu-checkbox iconClass="user-opitem" uncheckIcon="favorite_border" checkedIcon="favorite" />
                    </li>
                    <li class="f-left op-item mid">
                        <!--<i class="icon-mark"></i>-->
                        <mu-checkbox iconClass="user-opitem" uncheckIcon="bookmark_border" checkedIcon="bookmark" />
                    </li>
                    <li class="f-left op-item" @click="replyUser(commentItem.userId,commentItem.userName,commentItem.content,commentItem.postId)">
                        <i class="icon-huifu"></i>
                    </li>
                </ul>
            </div>
        </mu-card>
    </div>
</template>
<script>
    export default {
        props: {
            commentItem: {
                type: [Object],
                default: ''
            },
            commentFloor: {
                type: [Number],
                default: '1'
            }
        },
        methods: {
            getThisUser(uid) {
                this.$router.push({
                    path: '/otheruser/' + uid
                })
            },
            replyUser(uid, uName, rContent, pid) {
                this.$router.push({
                    path: '/posts/reply-user/' + uid,
                    query: {
                        u: uName,
                        c: rContent,
                        redirect: '/posts/post-details/' + pid
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .comment-content {
        padding: 0 20px 10px;
    }
    
    .comment-content p {
        line-height: 24px;
        font-size: 14px;
    }
    
    .comment-img-box,
    .comment-reply,
    .comment-item {
        margin-top: 10px;
    }
    
    .comment-reply p.reply-user::before {
        content: attr(data-user);
        display: inline-block;
        margin-right: 5px;
        color: #ff5252;
    }
    
    .reply-time {
        text-align: right;
        color: rgba(71, 74, 79, 0.54);
    }
    
    .rp-post-time {
        color: rgba(71, 74, 79, 0.54);
    }
    
    .load-more-reply {
        text-align: center;
        padding: 5px 0;
        margin: 0 20px;
        color: rgba(71, 74, 79, 0.54);
    }
    
    .user-operators {
        /*height: 40px;*/
        /*line-height: 40px;*/
        padding-bottom: 10px;
    }
    
    .user-operators ul {
        padding: 0 40px;
    }
    
    .op-item {
        width: 30%;
        text-align: center;
        color: #ff5252;
    }
    
    .op-item.mid {
        margin: 0 5%;
    }
    
    .user-opitem.mu-icon {
        font-size: 24px;
    }
    
    .icon-huifu {
        font-size: 24px;
        color: #7e848c;
    }
    
    .op-item .mu-checkbox {
        margin-top: 6px;
    }
</style>