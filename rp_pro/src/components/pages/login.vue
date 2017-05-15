<template>
    <div class="rp-login">
        <transition @enter="logoShow">
            <img :src="logoImg" alt="随贴" v-show="showLogo" class="rp-logo" />
        </transition>
        <form ref="form" class="rp-login-form">
            <mu-text-field label="手机号" v-model="userInfo.phone" hintText="请输入手机号" :errorText="errorUser" name="username" type="input" labelFloat icon="stay_current_portrait" />
            <mu-text-field label="密码" v-model="userInfo.password" hintText="请输入密码" :errorText="errorPsd" name="password" type="password" labelFloat icon="lock_outline" />
            <mu-flat-button type="button" class="rp-submit" label="登录" backgroundColor="#474a4f" color="#fff" @click="login" />
        </form>
        <router-link :to="{path:'/reg'}" class="rp-reg-link">没有账号?点此创建</router-link>
        <transition @enter="showLoading" @leave="hideLoading">
            <loading class="show-loading" v-show="isLoading"></loading>
        </transition>
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
            logoImg: require('../../assets/rp_logo.png'),
            isLoading: false,
            showLogo: false,
            userInfo: {
                phone: '',
                password: ''
            }
        }
    },
    mounted() {
        this.showLogo = true
    },
    methods: {
        login() {
            if (this.userInfo.userName != '' && this.userInfo.password != '') {
                this.errorUser = ''
                this.errorPsd = ''
                this.isLoading = true
                this.$http.post('/api/login', qs.stringify(this.userInfo)).then((res) => {
                    this.isLoading = false
                    if (res.data.errCode === 0) {
                        //登录成功将用户id以及token值存入缓存
                        this.commonMethods.setStr('user_id', res.data.data.id, 0)
                        this.commonMethods.setStr('token', res.data.data.token, 0)
                        this.$store.dispatch('setUserId', res.data.data.id)
                        this.$store.dispatch('setLoginToken', res.data.data.token)
                        this.$store.dispatch('getLoginStatus')
                        this.$router.push(this.$route.query.redirect)
                    } else {
                        this.errorUser = res.data.errMsg
                    }
                })
            } else if (this.userInfo.userName === '') {
                this.errorUser = '用户名不能为空'
                this.errorPsd = ''
            } else if (this.userInfo.password === '') {
                this.errorPsd = '请输入密码'
                this.errorUser = ''
            }
        },
        showLoading() {
            useVelocity('show-loading').animationType('transition.expandIn')
        },
        hideLoading() {
            useVelocity('show-loading').animationType('transition.expandOut', { duration: 650, delay: 650 })
        },
        logoShow() {
            useVelocity('rp-logo').animationType('transition.swoopIn').animationType('callout.tada', { duration: 1000, delay: 650 })
        }
    }
}
</script>

<style lang="css">
.rp-login {
    padding-top: 40px;
}

.mu-flat-button.rp-submit {
    width: 75%;
    margin-top: 20px;
    border-radius: 30px;
}

.rp-logo {
    width: 100px;
}

.rp-login-form {
    margin-top: 20px;
}

.rp-reg-link {
    display: block;
    margin-top: 20px;
}
</style>