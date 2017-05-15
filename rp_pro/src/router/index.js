import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/pages/index'
import Posts from '@/components/pages/posts'
import PostDetails from '@/components/pages/posts/post-details'
import ReplyPosts from '@/components/pages/posts/reply-post'
import ReplyUser from '@/components/pages/posts/reply-user'

import User from '@/components/pages/user'
import OtherUser from '@/components/pages/other-user'
import AddQuestion from '@/components/pages/add-question'
import AddShare from '@/components/pages/add-share'

import Fans from '@/components/pages/user/fans'
import UserMark from '@/components/pages/user/user_mark'
import UserMsg from '@/components/pages/user/user_msg'


import Login from '@/components/pages/login'
import Reg from '@/components/pages/reg'

import NotFoundPage from '@/components/404/404page'


import store from '../store/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/index',
        component: Index
    }, {
        path: '/index',
        name: '首页',
        component: Index
    }, {
        path: '/posts',
        name: '发现',
        component: Posts
    }, {
        path: '/posts/post-details/:postId',
        name: '主题帖',
        meta: {
            needBack: true
        },
        component: PostDetails
    }, {
        path: '/posts/reply-posts/:postsId',
        name: '回复帖子',
        meta: {
            needBack: true,
            requireAuth: true,
        },
        component: ReplyPosts
    }, {
        path: '/posts/reply-user/:userId',
        name: '回复',
        meta: {
            needBack: true,
            requireAuth: true,
        },
        component: ReplyUser
    }, {
        path: '/otheruser/:uid',
        name: 'TA的主页',
        meta: {
            needBack: true
        },
        component: OtherUser
    }, {
        path: '/user',
        name: '个人中心',
        meta: {
            requireAuth: true
        },
        component: User
    }, {
        path: '/user/fans',
        name: '我的粉丝',
        meta: {
            requireAuth: true,
            needBack: true
        },
        component: Fans
    }, {
        path: '/user/user-concern',
        name: '我的关注列表',
        meta: {
            requireAuth: true,
            needBack: true
        },
        component: Fans
    }, {
        path: '/user/user-mark',
        name: '我的关注',
        meta: {
            requireAuth: true,
            needBack: true
        },
        component: UserMark
    }, {
        path: '/user/user-msg',
        name: '我的消息',
        meta: {
            requireAuth: true,
            needBack: true
        },
        component: UserMsg
    }, {
        path: '/login',
        name: '登录',
        meta: {
            needBack: true
        },
        component: Login
    }, {
        path: '/reg',
        name: '注册',
        meta: {
            needBack: true
        },
        component: Reg
    }, {
        path: '/add-questions',
        name: '我要发布',
        meta: {
            requireAuth: true,
            needBack: true
        },
        component: AddQuestion
    }, {
        path: '/add-share',
        name: '我要分享',
        meta: {
            requireAuth: true
        },
        component: AddShare
    }, {
        path: '*',
        name: '404',
        component: NotFoundPage
    }]
})

router.beforeEach((to, from, next) => {
    let isLogin = store.getters.isLogin
    store.dispatch('setTitle', to.name)
    store.dispatch('getBodyHeight')
    store.dispatch('setFixedState', false)
    store.dispatch('setShowHeader', true)

    if (to.meta.requireAuth) {
        if (isLogin) {
            if (to.meta.needBack) {
                store.dispatch('hideOperateBtn')
            } else {
                store.dispatch('getCurPage', { curPage: to.path.split('/')[1] })
                store.dispatch('showOperateBtn')
            }
            next()
        } else {
            next({ path: '/login', query: { redirect: to.fullPath } })
        }
    } else {
        if (to.meta.needBack) {
            store.dispatch('hideOperateBtn')
        } else {
            store.dispatch('getCurPage', { curPage: to.path.split('/')[1] })
            store.dispatch('showOperateBtn')
        }
        next()
    }
})
export default router