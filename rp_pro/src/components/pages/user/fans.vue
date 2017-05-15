<template>
    <div class="rp-fans">
        <template v-for="(item,index) in concernList">
            <concern-item :concernData="item"></concern-item>
        </template>
    </div>
</template>
<script>
import ConcernItem from '../../use-components/concern'
export default {
    components: {
        ConcernItem
    },
    data() {
        return {
            concernList: [{
                userImg: require('../../../assets/userimg.png'),
                userName: '幼稚的魔法师',
                sex: 1,
                isConcern: false,
                userId: 1
            }, {
                userImg: require('../../../assets/userimg.png'),
                userName: '幼稚的魔法师',
                sex: 0,
                isConcern: true,
                userId: 2
            }]
        }
    },
    mounted () {
        useVelocity('concern-item').animationType('transition.slideLeftBigIn', { stagger: 400 })  
    },
    methods: {
        itemEnter() {
            useVelocity('concern-item').animationType()
        }
    }
}
</script>