# random_post(随呗)

## 概述
> 初学vue-cli,并使用vue-cli完成的一个简单的微型技术咨询论坛,便于用户发布/分享/解决问题的平台

## 目的
> 并没有什么实际的目的,一个是加深自己对vue-cli的理解,一个就是为自己身边的朋友做的一个方便他们发布问题以及解决问题的平台

## 亮点
> 亮点的话,可以说有也可以说没有吧,一个是因为还不成熟,一个是因为技术不是自己的.
> 
> 主要就是考虑到用户群体都是程序员,且平台是在手机上的,让一个程序员在手机上写代码,想想都是不太切合实际的,所以有一个功能就是可以进行图片识别代码,并自动输出识别后的代码,方便用户的二次编辑(极大程度的减小完全编辑代码的繁琐)

## 主要功能
* 登录/注册
* 发布/分享/评论/回复/收藏 帖子
* 借用第三方开源库(tesseract.js完成图片识别功能)
* 用户间相互关注/查看Ta的帖子动态
* 还有很多很多想法,但是又不想做复杂,毕竟只是给周围的朋友用的,用户群体不是很大

## 已知问题
* 接口未全部套入
* 每次追加数据(上拉加载)后,动画会从头开始加载
* vuex的数据优化

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
