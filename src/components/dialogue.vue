<template>
    <div class="dialogue">
        <header id="wx-header">
            <div class="other">
                <router-link :to="{path:'/wechat/dialogue/dialogue-info',query: { groupName: $route.query.name, groupId: $route.query.userId}}" tag="span" class="iconfont icon-chat-group" v-show="$route.query.currentConversationType=='GROUP'"></router-link>
                <router-link :to="{path:'/wechat/dialogue/dialogue-detail',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-friends" v-show="$route.query.group_num==1"></router-link>
            </div>
            <div class="center">
                <router-link to="/" tag="div" class="iconfont icon-return-arrow">
                    <span>微信</span>
                </router-link>
                <span>{{pageName}}</span>
                <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
            </div>
        </header>
        <section class="dialogue-section clearfix" v-on:click="MenuOutsideClick" ref="message-list" @scroll="this.onScroll">
            <div class="row clearfix" v-for="item in currentMessageList" :class="item.flow=='out'?'position-right':'position-left'">
                <div v-if="item.flow=='in'">
                    <img v-if="$route.query.currentConversationType == 'GROUP'" :src="item.avatar" class="header" >
                    <img v-else :src="$route.query.avatar" class="header" >
                    <p class="text" v-html="contentList(item.payload)"></p>
                </div>
                
                <!-- 群消息提醒 -->
                <div v-else-if="item.type===TIM.TYPES.MSG_GRP_TIP">

                </div>

                <div v-else>
                    <p class="textRight" v-html="contentList(item.payload)"></p>
                    
                    <img  :src="$store.state.currentUserProfile.avatar" class="header" >
                </div>
                <!-- <div v-else class="messageRight">
                    <template v-for="(item, index) in contentList(item.payload)">
                        <p class="textRight"  :key="index" v-if="item.name === 'text'">{{ item.text }}</p>
                        <p class="textRight" v-else-if="item.name === 'img'"><img class="text"  :src="item.src" width="35px" height="35px" :key="index" /></p>
                    </template>
                    <img :src="$store.state.currentUserProfile.avatar" class="header">
                </div> -->
            </div>
            <span class="msg-more" id="msg-more"><ul>
                    <li>复制</li>
                    <li>转发</li>
                    <li>收藏</li>
                    <li>删除</li>
                </ul></span>
        </section>
        <footer class="dialogue-footer">
            <div class="component-dialogue-bar-person">
                <span class="iconfont icon-dialogue-jianpan" v-show="!currentChatWay" v-on:click="currentChatWay=true"></span>
                <span class="iconfont icon-dialogue-voice" v-show="currentChatWay" v-on:click="currentChatWay=false"></span>
                <div class="chat-way" v-show="!currentChatWay">
                    <div class="chat-say" v-press>
                        <span class="one">按住 说话</span>
                        <span class="two">松开 结束</span>
                    </div>
                </div>
                <div class="chat-way" v-show="currentChatWay">
                    <input class="chat-txt" type="text" v-on:focus="focusIpt" v-on:blur="blurIpt" v-model="messageContent"
                        @keyup.enter="handleEnter"
                        @keyup.enter.native="handleEnter"
                    />
                </div>
                <span class="expression iconfont icon-dialogue-smile" @click="smile"></span>
                <span class="more iconfont icon-dialogue-jia"></span>
                
                <div class="recording" style="display: none;" id="recording">
                    <div class="recording-voice" style="display: none;" id="recording-voice">
                        <div class="voice-inner">
                            <div class="voice-icon"></div>
                            <div class="voice-volume">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <p>手指上划,取消发送</p>
                    </div>
                    <div class="recording-cancel" style="display: none;">
                        <div class="cancel-inner"></div>
                        <p>松开手指,取消发送</p>
                    </div>
                </div>
            </div>
            <div class="tooltip" :class="{'active': emoji}">
                <div class="emojis">
                    <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
                        <img :src="emojiUrl + emojiMap[item]" style="width:25px;height:25px" />
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
    import { mapGetters, mapState } from 'vuex'
    import { decodeText } from '../utils/decodeText'
    import { emojiMap, emojiName, emojiUrl } from '../utils/emojiMap'
    export default {
        data() {
            return {                                                                                                                     
                pageName: this.$route.query.name,
                currentChatWay: true, //ture为键盘打字 false为语音输入
                timer: null,
                    // sayActive: false // false 键盘打字 true 语音输入
                messageContent: '', // 发送消息的内容
                currentConversationType: this.$route.query.currentConversationType, // 私人消息或群聊
                isShowScrollButtomTips: false,
                preScrollHeight: 0,
                showConversationProfile: false,
                // 表情
                emojiMap: emojiMap,
                emojiName: emojiName,
                emojiUrl: emojiUrl,
                emoji: true
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit("setPageName", vm.$route.query.name)
            })
        },
        computed: {
            ...mapState([
                'currentConversation',
                'currentMessageList'
            ]),
            msgInfo() {
                for (var i in this.$store.state.msgList.baseMsg) {
                    if (this.$store.state.msgList.baseMsg[i].mid == this.$route.query.mid) {
                        return this.$store.state.msgList.baseMsg[i]
                    }
                }
            },
        },
        directives: {
            press: {
                inserted(element, binding) {
                    var recording = document.querySelector('.recording'),
                        recordingVoice = document.querySelector('.recording-voice'),
                        recordingCancel = document.querySelector('.recording-cancel'),
                        startTx, startTy;
                    
                    element.addEventListener('touchstart', function(e) {
                        // 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
                        element.className = "chat-say say-active"
                        recording.style.display = recordingVoice.style.display = "block"
                            // console.log('start')
                        var touches = e.touches[0]
                        startTx = touches.clientX
                        startTy = touches.clientY
                        e.preventDefault()
                    }, false)
                    element.addEventListener('touchend', function(e) {
                        /*var touches = e.changedTouches[0];
                        var distanceY = startTy - touches.clientY;
                        if (distanceY > 50) {
                            console.log("取消发送信息");
                        }else{
                            console.log("发送信息");
                        }*/

                        element.className = "chat-say"
                        recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
                            // console.log('end')
                        e.preventDefault()
                    }, false)
                    element.addEventListener('touchmove', function(e) {
                        var touches = e.changedTouches[0],
                            endTx = touches.clientX,
                            endTy = touches.clientY,
                            distanceX = startTx - endTx,
                            distanceY = startTy - endTy;

                        if (distanceY > 50) {
                            element.className = "chat-say"
                            recordingVoice.style.display = "none"
                            recordingCancel.style.display = "block"
                        }else{
                            element.className = "chat-say say-active"
                            recordingVoice.style.display = "block"
                            recordingCancel.style.display = "none"
                        }
                        // 阻断事件冒泡 防止页面被一同向上滑动
                        e.preventDefault()
                    }, false);
                }
            },
            more: {
                bind(element, binding) {
                    var startTx, startTy
                    element.addEventListener('touchstart', function(e) {
                        var msgMore = document.getElementById('msg-more'),
                            touches = e.touches[0];
                        startTx = touches.clientX
                        startTy = touches.clientY
                        
                        clearTimeout(this.timer)
                        this.timer = setTimeout(()=>{
                            // 控制菜单的位置
                            msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px'
                            msgMore.style.top = (element.offsetTop - 33) + 'px'
                            msgMore.style.display = "block"
                            element.style.backgroundColor = '#e5e5e5'
                        },500)

                    }, false)
                    element.addEventListener('touchmove', function(e) {
                        var touches = e.changedTouches[0],
                            disY = touches.clientY;
                        if (Math.abs(disY-startTy)>10) {
                            clearTimeout(this.timer)
                        }
                    }, false)
                    element.addEventListener('touchend', function(e) {
                        clearTimeout(this.timer)
                    }, false)
                }
            }
        },
        updated() {
            this.keepMessageListOnButtom()
        },
        methods: {
            // 解决输入法被激活时 底部输入框被遮住问题
            focusIpt() {
                this.timer = setInterval(function() {
                    document.body.scrollTop = document.body.scrollHeight
                }, 100)
            },
            blurIpt() {
                clearInterval(this.timer)
            },
            // 点击空白区域，菜单被隐藏
            MenuOutsideClick(e) {
                
                var container = document.querySelectorAll('.text'),
                    msgMore = document.getElementById('msg-more')
                if (e.target.className === 'text') {

                } else {
                    msgMore.style.display = 'none'
                    container.forEach(item=>item.style.backgroundColor='#fff')
                }
            },
            /**
             * 表情图片处理
             */
            contentList(payload) {
                let res = ''
                if(payload.text) {
                    let text = decodeText(payload)
                    text.forEach( v => {
                        if(v.name === "text") {
                            res += '<span>' + v.text + '</span>'
                        } else if(v.name === "img") {
                            res += '<img style="width:25px;height25px" src='+ v.src + '></img>'
                        }
                    })
                }
                return res
            },
            /**
             * 回车事件
             */
            handleEnter() {
                this.sendTextMessage()
            },
            /**
             * 发送消息
             */
            sendTextMessage() {
                let toAccount = this.$route.query.userId
                if (this.messageContent === '' || this.messageContent.trim().length === 0) {
                    this.messageContent = ''
                    alert('不能发送空消息哦！')
                    return
                }
                const message = this.tim.createTextMessage({
                    to: toAccount,
                    conversationType: this.currentConversationType,
                    payload: { text: this.messageContent }
                })
                this.$store.commit('pushCurrentMessageList', message)
                // this.$bus.$emit('scroll-bottom')
                this.tim.sendMessage(message)
                this.messageContent = ''
            },
            /**
             * 监听滚动条
             */
            onScroll({ target: { scrollTop } }) {
                let messageListNode = this.$refs['message-list']
                if (!messageListNode) {
                    return
                }
                if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
                    this.isShowScrollButtomTips = false
                }
            },
            // 如果滚到底部就保持在底部，否则提示是否要滚到底部
            keepMessageListOnButtom() {
                let messageListNode = this.$refs['message-list']
                if (!messageListNode) {
                    return
                }
                // 距离底部20px内强制滚到底部,否则提示有新消息
                if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 20) {
                    this.$nextTick(() => {
                        messageListNode.scrollTop = messageListNode.scrollHeight
                    })
                    this.isShowScrollButtomTips = false
                } else {
                    this.isShowScrollButtomTips = true
                }
                this.preScrollHeight = messageListNode.scrollHeight
            },
            smile() {
                this.emoji = !this.emoji
            },
            chooseEmoji(item) {
                this.messageContent += item
            },
        },
        mounted() {
            this.$store.dispatch(
                'checkoutConversation',
                this.$route.query.mid
            )
            // this.$store.commit('updateConversationID', this.$route.query.mid)
            console.log(this.$store.state.currentMessageList, '当前会话')
            console.log(this.$store.state.currentConversation.conversationID, 'conversationID')
            console.log(this.$store.state.currentUserProfile, '当前用户数据')
        },
    }
</script>
<style>
    @import "../assets/css/dialogue.css";
    .say-active {
        background: #c6c7ca;
    }
    .position-right  {
        display: flex;
        justify-content: flex-end;
    }
    .position-left  {
        display: flex;
        justify-content: flex-start;
    }
    .tooltip {
        width: 90%;
        opacity: 1;
        transform-origin: center bottom;
        z-index: 2009;
        left:0;
        right:0;
        bottom: 60px;
        position: fixed;
        background: #FFF;
        min-width: 150px;
        border-radius: 4px;
        border: 1px solid #EBEEF5;
        padding: 12px;
        z-index: 2000;
        color: #606266;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        word-break: break-all;
        transition: opacity .2s ease,transform .6s ease;
        margin: auto;
        text-align: center;
        
        /* transform: scale(0); */
    }
    .emojis {
        height: 102px;
        overflow-x: scroll;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .active {
        transform: scale(0);
        /* opacity: 1;
        transition: initial; */
    }
</style>

<style lang="less" rel="stylesheet/less">
    
</style>