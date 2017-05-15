<template>
    <div class="post-mark-item">
        <mu-card>
            <div class="mark-title" @click="getPost(markItem.postId)">
                <p><span>[{{ markItem.postType===1?'心得':'提问' }}]</span> {{ markItem.postTitle }}</p>
            </div>
            <div class="mark-info clear">
                <div class="mark-user-info db-line">
                    <p>贴主：{{ markItem.user }}</p>
                    <span>{{ markItem.postTime }}</span>
                </div>
                <div class="mark-post-info f-right">
                    <ul class="clear">
                        <li class="f-left post-info">
                            <i class="icon-zan"></i>
                            <p>{{ markItem.likeNum }}</p>
                        </li>
                        <li class="f-left post-info">
                            <i class="icon-mark"></i>
                            <p>{{ markItem.markNum }}</p>
                        </li>
                        <li class="f-left post-info">
                            <i class="icon-huifu"></i>
                            <p>{{ markItem.msgNum }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </mu-card>
    </div>
</template>
<script>
    export default {
        props: {
            markItem: {
                type: [Object],
                default: ''
            }
        },
        data() {
            return {}
        },
        methods: {
            getPost(pid) {
                this.$router.push({
                    path: '/posts/post-details/' + pid
                })
            }
        }
    }
</script>
<style lang="css" scoped>
    .post-mark-item {
        margin-bottom: 10px;
    }
    
    .mark-title {
        padding: 10px;
        color: #000;
    }
    
    .mark-title span {
        color: #ff5252;
    }
    
    .mark-user-info {
        line-height: 22px;
    }
    
    .mark-info {
        padding: 10px;
        margin-top: 10px;
        color: rgba(71, 74, 79, 0.54);
        font-size: 12px;
    }
    
    .post-info {
        text-align: center;
        padding: 0 10px;
    }
    
    .post-info p {}
</style>