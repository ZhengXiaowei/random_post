<template>
    <div class="rp-add-question">
        <form class="rp-question-form t-left" ref="form">
            <mu-select-field v-model="selectVal" labelFloat fullWidth hintText="请选择要发帖的主题" :labelFocusClass="['label-foucs']" label="帖子主题">
                <mu-menu-item v-for="text,index in postType" :key="index" :value="index" :title="text" />
            </mu-select-field>
            <mu-text-field label="帖子标题" class="reply-text-ipts" fullWidth labelFloat :errorText="errorText" hintText="标题最多不要超过20字" v-model="postTitle" :maxLength="20" @textOverflow="showErrorText" />
            <mu-text-field label="帖子内容" hintText="请输入内容" fullWidth labelFloat multiLine :rows="4" :rowsMax="8" v-model="text" />
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
            <mu-flat-button type="button" class="rp-post-btn" label="发布" backgroundColor="#474a4f" color="#fff" @click="publishPost" />
        </form>
        <mu-dialog :open="showDialog" title="警告" @close="dialogClose">
            {{ alertText }}
            <mu-flat-button slot="actions" primary @click="dialogClose" label="确定" />
        </mu-dialog>
        <transition @enter="showLoading" @leave="hideLoading">
            <loading class="show-loading" v-show="isLoading" loadingText="正在读取内容.."></loading>
        </transition>
    </div>
</template>
<script>
import Loading from '../use-components/loading'
import _ from 'lodash'
export default {
    components: {
        Loading
    },
    data() {
        return {
            selectVal: 0,
            postType: ['我要提问', '我能分享'],
            postTitle: '',
            errorText: '',
            uploadFile: [],
            showDialog: false,
            alertText: '',
            text: '',
            isLoading: false
        }
    },
    created() {
        this.$store.watch((state)=>{
            return state.isLoading
        },()=>{
            this.isLoading = this.$store.getters.loadingState
            this.text += this.$store.getters.getImgText
        })
    },
    methods: {
        showErrorText(isOverFloat) {
            this.errorText = isOverFloat ? '要控制好标题的字数哈~' : ''
        },
        getUploadFile(e) {
            //得到上传的图片信息 有瑕疵 暂时没做追加的
            let uploadFile = e.target.files.length,
                havedFile = this.uploadFile.length
            if (uploadFile + havedFile > 4) {
                this.showDialog = true
                this.alertText = '最多只能选择4张图片'
            } else {
                this.uploadFile = this.commonMethods.getUploadFile(e.target.files)
            }
        },
        getUFileText(e) {
            //eng->英文,chi_sim->中文
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
.rp-question-form {
    width: 90%;
    margin: 0 auto;
    padding: 10px 0;
}

.rp-file {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
}

.rp-upload.mu-flat-button {
    min-width: auto;
}

.file-item {
    width: 23%;
    height: 85px;
    margin-right: 2%;
    margin-bottom: 2%;
    position: relative;
    left: 1%;
}

.file-item img {
    height: inherit;
}

.file-remove.mu-icon {
    position: absolute;
    top: -12%;
    right: -16%;
    z-index: 9;
}

.mu-flat-button.rp-post-btn {
    display: block;
    width: 80%;
    margin: 10px auto 0;
}

.rp-notes {
    color: #d3d6db;
    font-size: 12px;
}

.reply-text-ipts{
    font-size: 14px;
}

.nomr {
    margin-right: 0;
}

.nomb {
    margin-bottom: 0;
}
</style>