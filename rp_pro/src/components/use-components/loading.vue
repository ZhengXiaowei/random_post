<template>
    <div class="rp-loading-box">
        <div class="rp-loading">
            <mu-circular-progress :size="60" color="red" />
            <p class="loading-text">{{ loadingText }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        loadingText: {
            type: String,
            default: '正在登录中...'
        }
    }
}
</script>
<style lang="css" scoped>
.rp-loading-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
}

.rp-loading-box::before{
    content: "";
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
}

.rp-loading {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -60px;
    margin-left: -60px;
    z-index: 999;
}

.rp-loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: inherit;
    display: block;
    z-index: -1;
    background: #000;
    opacity: .4;
    border-radius: 4px;
}

.rp-loading::after {
    content: '';
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.mu-circular-progress {
    margin-top: 30px;
}

.loading-text {
    color: #fff;
}
</style>
