<template>
    <!--消息列表组件 数据交互频繁-->
    <!--进入 dialogue 页面，携带参数 mid name group_num -->
    <li :class="{'item-hide':deleteMsg}">
        <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
        <router-link :to="{ path: '/wechat/dialogue', query: updateRouterParams}" tag="div" class="list-info" v-swiper v-on:click.native="toggleMsgRead($event,'enter')">
            <div class="header-box">
                <!--未读并且未屏蔽 才显示新信息数量-->
                <i class="new-msg-count" v-show="item.unreadCount > 0">{{item.unreadCount}}</i>
                <!--未读并且屏蔽 只显示小红点-->
                <!-- <i class="new-msg-dot" v-show="!read&&item.quiet"></i> -->
                <!--如果是私聊，只显示一个头像； 如果是群聊，则显示多个头像，flex 控制样式-->
                <div class="header" :class="[item.type=='GROUP'?'multi-header':'']">
                    <!-- <img v-for="userInfo in item.userProfile" :src="userInfo.avatar"> -->
                    <img v-if="item.type !='GROUP'" :src="item.userProfile.avatar">
                    <img v-else  v-for="userInfo in item.groupMemberList" :src="userInfo.avatar">
                </div>
            </div>
            <div class="desc-box">
                <!--使用过滤器 fmtDate 格式化时间-->
                <div class="desc-time">{{date}}</div>
                <div class="desc-author" v-if="item.type=='GROUP'">{{item.groupProfile.name}}</div>
                <!--如果没有备注好友，则显示微信昵称-->
                <div class="desc-author" v-else>{{item.userProfile.nick||item.userProfile.userID}}</div>
                <div class="desc-msg">
                    <div class="desc-mute iconfont icon-mute" v-show="item.quiet">
                    </div>
                    <span v-if="item.type=='GROUP'">{{item.lastMessage.messageForShow}}</span>
                    <span v-else>{{item.lastMessage.messageForShow}}</span>
                </div>
            </div>
        </router-link>
        <div class="operate-box">
            <div class="operate-unread" v-if="read" v-on:click="toggleMsgRead">标为未读</div>
            <div class="operate-read" v-else v-on:click="toggleMsgRead">标为已读</div>
            <div class="operate-del" v-on:click="deleteMsgEvent">删除</div>
        </div>
    </li>
</template>
<script>
    import { isToday, getDate, getTime } from '../utils/date' 
    export default {
        props: ["item"],
        data() {
            return {
                read: this.item.read,
                deleteMsg: false,
                // router 传递参数
                routerParam : {
                    mid: '', // 消息id
                    name: '', // 用户昵称或id
                    group_num: 1, // 群聊人数
                    avatar: '', // 用户头像
                    userId: ''  // 用户id
                },
                // isSDKReady : this.$store.state.isSDKReady
            }
        },
        computed: {
            date: function() {
                if (
                    !this.item.lastMessage ||
                    !this.item.lastMessage.lastTime
                ) {
                    return ''
                }
                const date = new Date(this.item.lastMessage.lastTime * 1000)
                if (isToday(date)) {
                    return getTime(date)
                }
                return getDate(date)
            },
            /**
             * 判断是否是群消息还是私聊
             */
            updateRouterParams() {
                let mmm = {}
                if(this.item.type === "GROUP") {
                    mmm.mid = this.item.conversationID
                    mmm.name = this.item.groupProfile.name
                    mmm.group_num = this.item.groupMemberList ? this.item.groupMemberList.length : 0
                    mmm.avatar = this.item.groupProfile.avatar
                    mmm.userId = this.item.groupProfile.groupID
                    mmm.currentConversationType = 'GROUP'
                } else {
                    mmm.mid = this.item.conversationID
                    mmm.name = this.item.userProfile.nick||(item.userProfile.userID)
                    mmm.group_num = 1
                    mmm.avatar = this.item.userProfile.avatar
                    mmm.userId = this.item.userProfile.userID
                    mmm.currentConversationType = 'C2C'
                }
                return mmm
            }
        },
        // 监听处理
        watch: {
        },
        methods: {
            //切换消息未读/已读状态
            toggleMsgRead(event, status) {
                if (status === 'enter') {
                    if (this.read) {
                        return ''
                    }
                    this.read = true
                } else {
                    this.read = !this.read
                }
                if (!this.item.quiet) {
                    if (this.read) {
                        this.$store.commit('minusNewMsg')
                    } else {
                        this.$store.commit('addNewMsg')
                    }
                }

                event.target.parentNode.parentNode.firstChild.style.marginLeft = 0 + "px"
            },
            deleteMsgEvent() {
                this.deleteMsg = true
                if (!this.item.quiet) {
                    if (!this.read) {
                        this.$store.commit('minusNewMsg')
                    }
                }
            },
        },
        mounted() {
           // this.getGroupList()
        },
        // 参考 https://vuefe.cn/v2/guide/custom-directive.html
        directives: {
            swiper: {
                bind: function(element, binding) {
                    var isTouchMove, startTx, startTy
                    element.addEventListener('touchstart', function(e) {
                        var touches = e.touches[0]
                        startTx = touches.clientX
                        startTy = touches.clientY
                        isTouchMove = false;
                    }, false);
                    element.addEventListener('touchmove', function(e) {
                        var touches = e.changedTouches[0],
                            endTx = touches.clientX,
                            endTy = touches.clientY,
                            distanceX = startTx - endTx,
                            distanceY = startTy - endTy;
                        if (distanceX < 0) { //右滑
                            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                                if (Math.abs(distanceX) > 20) {
                                    element.style.transition = "0.3s"
                                    element.style.marginLeft = 0 + "px"
                                }
                            }
                        } else { //左滑
                            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                                if (distanceX < 156 && distanceX > 20) {
                                    e.preventDefault()
                                    element.style.transition = "0s"
                                    element.style.marginLeft = -distanceX + "px"
                                    isTouchMove = true
                                }
                            }
                        }
                        // e.preventDefault()
                    }, false);
                    element.addEventListener('touchend', function(e) {
                        if (!isTouchMove) {
                            return;
                        }
                        var touches = e.changedTouches[0],
                            endTx = touches.clientX,
                            endTy = touches.clientY,
                            distanceX = startTx - endTx,
                            distanceY = startTy - endTy,
                            isSwipe = false
                        if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                            if (distanceX < 0) {
                                return;
                            }
                            if (Math.abs(distanceX) < 60) {
                                isSwipe = true
                                element.style.transition = "0.3s"
                                element.style.marginLeft = 0 + "px"
                            } else {
                                element.style.transition = "0.3s"
                                element.style.marginLeft = "-156px"
                            }
                        }
                    }, false);
                }
            }
        }
    }
</script>