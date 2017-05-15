<template>
    <div class="concern-item p-rel">
        <img :src="concernData.userImg" :alt="concernData.userName" />
        <div class="concern-user db-line">
            <p>{{ concernData.userName }}</p>
            <span :class="[concernData.sex?'icon-men':'icon-women']"></span>
        </div>
        <!--需要判断我的关注和我的粉丝-->
        <mu-flat-button v-if="!showTypePage" class="rp-concern-btn" :label="isConcerned?'已关注':'关注'" :class="[isConcerned?'concerned':'concern']" @click="switchConcern" />
        <!--<mu-flat-button v-else class="rp-concern-btn" :label="isConcerned?'已关注':'关注'" :class="[isConcerned?'concerned':'concern']" @click="switchConcern" />-->
    </div>
</template>
<script>
export default {
    props: {
        concernData: {
            type: [Object],
            default: ''
        },
        type: {
            type: [Number],
            default: 0
        }
    },
    created() {
        this.type ? this.showTypePage = true : this.showTypePage = false
        this.isConcerned = this.concernData.isConcern
    },
    data() {
        return {
            concernText: '',
            concernedColor: '',
            isConcerned: false,
            showTypePage: false
        }
    },
    methods: {
        switchConcern() {
            this.isConcerned = !this.isConcerned
        }
    }
}
</script>
<style>
.concern-item {
    text-align: left;
    padding: 10px 0;
    margin: 0 20px;
    border-bottom: 1px solid #eee;
}

.concern-item img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    vertical-align: middle;
}

.concern-user {
    vertical-align: middle;
    font-size: 14px;
    margin-left: 10px;
}

.rp-concern-btn.mu-flat-button {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -18px;
    border: 1px solid #bebebe;
    color: #000;
}

.concerned.mu-flat-button {
    background: #737373;
    color: #fff;
}

.nobb {
    border-bottom: 0;
}
</style>