<template>
    <div class="rp-post-item t-left">
        <mu-card>
            <mu-card-header class="item-title" :title="userInfo.nickname" :subTitle="itemData.updated_at" @click.native="getThisUser(userInfo.id)">
                <mu-avatar :src="userInfo.avatar" slot="avatar" />
                <mu-checkbox class="rp-like-user" uncheckIcon="star_border" slot="default" checkedIcon="star" />
            </mu-card-header>
            <mu-card-title :title="itemData.title" class="rp-item-title" @click.native="getThisDetail(itemData.id)"></mu-card-title>
            <mu-card-text class="rp-item-content" @click.native="getThisDetail(itemData.id)">{{ itemData.content }}</mu-card-text>
            <mu-card-actions class="rp-operate-box">
                <div class="rp-item-data db-line">
                    <mu-checkbox class="rp-like-post" iconClass="rp-item-check" uncheckIcon="favorite_border" checkedIcon="favorite" />
                    <p class="rp-operate-text">{{ itemData.collectNum }}</p>
                </div>
                <div class="rp-item-data db-line">
                    <mu-checkbox class="rp-like-post" iconClass="rp-item-check" uncheckIcon="bookmark_border" checkedIcon="bookmark" />
                    <p class="rp-operate-text">{{ itemData.collectNum }}</p>
                </div>
                <div class="rp-item-data db-line" @click="replyPost(itemData.postId,itemData.postTitle)">
                    <!--<mu-checkbox class="rp-like-post" iconClass="rp-item-check" uncheckIcon="chat_bubble_outline"/>-->
                    <mu-icon value="chat_bubble_outline" :size="24" class="rp-like-post" color="#7e848c" />
                    <p class="rp-operate-text2">{{ itemData.msgNum }}</p>
                </div>
            </mu-card-actions>
        </mu-card>
    </div>
</template>
<script>
export default {
    props: {
        itemData: [Object],
        userInfo:[Object]
    },
    data() {
        return {
            img: require('../../assets/user.jpg')
        }
    },
    created() {
        // console.log(this.userInfo)
    },
    methods: {
        getThisUser(uid) {
            this.$router.push({
                path: '/otheruser/' + uid
            })
        },
        getThisDetail(pid) {
            this.$router.push({
                path: '/posts/post-details/' + pid
            })
        },
        replyPost(pid,ptitle){
             this.$router.push({
                path: '/posts/reply-posts/' + pid,
                query:{
                    postTitle:ptitle,
                    redirect: '/posts/post-details/'+pid
                }
            })
        }
    }
}
</script>

<style lang="css">
.rp-post-item {
    padding: 10px;
}

.mu-checkbox.rp-like-user {
    position: absolute;
    right: 6%;
    top: 20%;
    /*margin-top: -12px;*/
}

.rp-item-data {
    /*margin-right: 5px;*/
    width: 32%;
    text-align: center;
    vertical-align: top;
}

.rp-like-post.mu-checkbox {
    /*height: 36px;*/
    /*line-height: 36px;*/
    /*width: 36px;*/
    vertical-align: bottom;
}

.rp-item-check.mu-icon {
    /*font-size: 36px;*/
    font-size: 24px;
    /*color: #ff5252*/
}

.mu-card-title-container.rp-item-title {
    padding: 5px 16px;
}

.mu-card-title-container.rp-item-title .mu-card-title {
    font-size: 14px;
    color: #212121;
}

.rp-item-content.mu-card-text {
    color: #757575;
}

.mu-card-actions.rp-operate-box {
    padding: 8px 20px;
}

.rp-operate-text {
    margin-top: 6px;
    font-size: 14px;
    font-family: rp_font;
}

.rp-operate-text2 {
    font-size: 14px;
    font-family: rp_font;
}

.nomr {
    margin-right: 0
}
</style>