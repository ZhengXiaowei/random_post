<template>
    <div class="reply-posts-page">
        <div class="reply-title">
            <p>回复主题帖：{{ postTitle }}</p>
        </div>
        <div class="reply-content">
            <mu-text-field label="回复内容" class="reply-text-ipts" hintText="请输入要回复的内容" fullWidth labelFloat multiLine :rows="6" :rowsMax="8" v-model="text" />
            <div class="show-upload-file" v-show="uploadFile.length!=0">
                <ul class="clear">
                    <li class="f-left file-item" :class="{'nomr':(index+1)%4===0,'nomb':index>3}" v-for="(item,index) in uploadFile">
                        <img :src="item" />
                        <mu-icon value="cancel" class="file-remove" @click="removeItem($event,item)"></mu-icon>
                    </li>
                </ul>
            </div>
            <mu-flat-button class="rp-upload" icon="camera_alt">
                <input type="file" accept="image/*" multiple class="rp-file" @change="getUploadFile" />
            </mu-flat-button>
            <mu-flat-button class="rp-upload" icon="camera">
                <input type="file" accept="image/*" class="rp-file" @change="getUFileText" />
            </mu-flat-button>
            <div class="rp-notes">
                <p>特别说明：第一个相机可拍照直接上传图片，第二个则为拍照后识别图片内容，并将文本输出至文本框(此功能属于测试版本)</p>
            </div>
            <mu-flat-button type="button" class="rp-post-btn" label="发表回复" backgroundColor="#474a4f" color="#fff" @click="publishPost" />
        </div>
        <mu-dialog :open="showDialog" title="警告" @close="dialogClose">
            {{ alertText }}
            <mu-flat-button slot="actions" primary @click="dialogClose" label="确定" />
        </mu-dialog>
        <transition @enter="showLoading" @leave="hideLoading">
            <loading class="show-loading t-center" v-show="isLoading" loadingText="正在读取内容.."></loading>
        </transition>
    </div>
</template>
<script>
import Loading from '../../use-components/loading'
import _ from 'lodash'
export default {
    components: {
        Loading
    },
    data() {
        return {
            postTitle: '',
            uploadFile: [],
            showDialog: false,
            alertText: '',
            text: '',
            isLoading: false
        }
    },
    created() {
        this.postTitle = this.$route.query.postTitle
        this.$store.watch((state)=>{
            return state.isLoading
        },()=>{
            this.isLoading = this.$store.getters.loadingState
            this.text += this.$store.getters.getImgText
        })
    },
    methods: {
        getUploadFile(e) {
            //得到上传的图片信息 有瑕疵 暂时没做追加的
            let uploadFile = e.target.files.length,
                havedFile = this.uploadFile.length
            if (uploadFile + havedFile > 4) {
                this.showDialog = true
                this.alertText = '总共能上传的图片数量不得超过四张!'
            } else {
                this.uploadFile = this.commonMethods.getUploadFile(e.target.files)
            }
        },
        getUFileText(e){
            this.commonMethods.recognizeImgCode(e.target.files)
        },
        dialogClose() {
            this.showDialog = false
        },
        removeItem(e, src) {
            _.remove(this.uploadFile, (n) => {
                return n === src
            })
            e.target.parentNode.parentNode.removeChild(e.target.parentNode)
        },
        publishPost() {
            this.$router.push(this.$route.query.redirect)
        },
        showLoading() {
            useVelocity('show-loading').animationType('transition.expandIn')
        },
        hideLoading() {
            useVelocity('show-loading').animationType('transition.expandOut', { duration: 650, delay: 650 })
        }
    }
}
</script>
<style>
.reply-posts-page {
    /*padding: 10px;*/
    text-align: left;
    color: #000;
}

.reply-title {
    background: #f5f5f5;
    padding: 10px;
    border-bottom: 2px solid #d9dce3;
}

.reply-content {
    padding: 10px;
}
.reply-text-ipts{
    font-size: 14px;
}
</style>