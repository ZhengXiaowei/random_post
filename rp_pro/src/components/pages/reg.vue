<template>
    <div class="rp-reg">
        <transition @enter="logoShow">
            <img :src="logoImg" alt="随贴" v-show="showLogo" class="rp-logo" />
        </transition>
        <form ref="form" class="rp-login-form">
            <mu-text-field label="手机号" v-model="userInfo.phone" fullWidth hintText="请输入手机号" :errorText="errorUser" name="username" type="input" labelFloat icon="stay_current_portrait" />
            <mu-text-field label="密码" v-model="userInfo.password" fullWidth hintText="请输入密码" :errorText="errorPsd" name="password" type="password" labelFloat icon="lock_outline" />
            <div class="code-box p-rel">
                <mu-text-field label="验证码" v-model="userInfo.code" fullWidth hintText="请输入验证码" :errorText="errorCode" name="code" type="input" labelFloat icon="code" :maxLength="4" />
                <div class="send-code p-abs">
                    <mu-flat-button type="button" class="rp-send-code" label="发送验证码" @click="send_code" />
                </div>
            </div>
            <mu-flat-button type="button" class="rp-submit" label="登录" backgroundColor="#474a4f" color="#fff" @click="reg" />
        </form>
        <router-link :to="{path:'/login'}" class="rp-reg-link">已有账号?点此登录</router-link>
        <!--<transition @enter="showLoading" @leave="hideLoading">
            <loading class="show-loading" v-show="isLoading"></loading>
        </transition>-->
    </div>
</template>
<script>
import Loading from '../use-components/loading'
import qs from 'qs'
export default {
    components: {
        Loading
    },
    data() {
        return {
            errorUser: '',
            errorPsd: '',
            errorCode: '',
            logoImg: require('../../assets/rp_logo.png'),
            isLoading: false,
            showLogo: false,
            userInfo: {
                phone: '',
                password: '',
                code: ''
            }
        }
    },
    mounted() {
        this.showLogo = true
    },
    methods: {
        logoShow() {
            useVelocity('rp-logo').animationType('transition.swoopIn').animationType('callout.tada', { duration: 1000, delay: 650 })
        },
        // showLoading() {
        //     useVelocity('show-loading').animationType('transition.expandIn')
        // },
        // hideLoading() {
        //     useVelocity('show-loading').animationType('transition.expandOut', { duration: 650, delay: 650 })
        // },
        send_code() {
            if (this.userInfo.phone != '') {
            } else {
                this.errorUser = '请输入手机号!'
            }
        },
        reg() {

        }
    }
}
</script>
<style scoped>
.rp-reg {
    padding-top: 20px;
}

.rp-login-form {
    margin: 10px 20px;
}

.send-code {
    top: 30%;
    right: 0;
}
</style>