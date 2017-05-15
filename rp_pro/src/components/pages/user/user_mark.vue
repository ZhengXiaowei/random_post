<template>
    <div class="user-mark">
        <template v-for="(item,index) in markList">
            <mark-item :markItem="item"></mark-item>
        </template>
</div>
</template>
<script>
    import MarkItem from '../../use-components/mark-item'
    export default {
        components: {
            MarkItem
        },
        data() {
            return {
                markList: [{
                    postId: 1,
                    postTitle: '在vue里使用ajax的正确用法,可使用vue-resource或者axios',
                    postType: 1,
                    user: '膜法师',
                    userId: 21,
                    postTime: '2017-02-12',
                    likeNum: 18,
                    markNum: 6,
                    msgNum: 299
                }, {
                    postId: 3,
                    postTitle: '怎样用正确的姿势完成一些小项目 怎么样?',
                    postType: 2,
                    user: '慕小牧',
                    userId: 26,
                    postTime: '2017-02-12',
                    likeNum: 18,
                    markNum: 6,
                    msgNum: 299
                }, {
                    postId: 12,
                    postTitle: '结合vue和velocity.js,在vue里使用高特效动画',
                    postType: 1,
                    user: '测试玩家',
                    userId: 2,
                    postTime: '2017-02-12',
                    likeNum: 18,
                    markNum: 6,
                    msgNum: 299
                }]
            }
        },
        mounted() {
            useVelocity('post-mark-item').animationType('transition.slideLeftBigIn', {
                stagger: 400
            })
        }
    }
</script>
<style lang="css" scoped>
    .user-mark {
        margin: 0 5px;
        padding: 10px 0;
        text-align: left;
    }
</style>