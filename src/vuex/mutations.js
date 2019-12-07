const mutations = {
    //切换语言 后期需要
    switchLang(state, lang) {
        state.currentLang = lang
        Vue.config.lang = lang
        document.cookie = "VR_LANG=" + lang + "; path=/;domain=.snail.com"
            // location.reload()
    },
    //设置当前页面名字
    setPageName(state, name) {
        state.currentPageName = name
    },
    //设置前一页名字 已遗弃
    // setBackPageName(state, name) {
    //     state.backPageName = name
    // },
    //当 search 组件全屏/非全屏时 切换公共头部状态
    toggleHeaderStatus(state, status) {
        state.headerStatus = status
    },
    //切换“微信”页中右上角菜单
    toggleTipsStatus(state, status) {
        if (status == -1) {
            state.tipsStatus = false
        } else {
            state.tipsStatus = !state.tipsStatus
        }
    },
    //增加未读消息数
    addNewMsg(state) {
        state.newMsgCount > 99 ? state.newMsgCount = "99+" : state.newMsgCount++
    },
    //减少未读消息数
    minusNewMsg(state) {
        state.newMsgCount < 1 ? state.newMsgCount = 0 : state.newMsgCount--
    },
    //将消息置顶 待完成
    setMsgStick(state, mid) {

    },
    //取消置顶消息 待完成
    cancelMsgStick(state, mid) {

    },

    /**
     * 更新当前会话
     * 调用时机: 切换会话时
     * @param {Object} state
     * @param {Conversation} conversation
     */
    updateCurrentConversation(state, conversation) {
        state.currentConversation = conversation
        state.currentMessageList = []
        state.nextReqMessageID = ''
        state.isCompleted = false
    },

    /**
     * 更新会话列表
     * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
     * @param {Object} state
     * @param {Conversation[]} conversationList
     */
    updateConversationList(state, conversationList) {
        state.conversationList = conversationList
    },
    /**
     * 将消息插入当前会话列表
     * 调用时机：收/发消息事件触发时
     * @param {Object} state
     * @param {Message[]|Message} data
     * @returns
     */
    pushCurrentMessageList(state, data) {
        // 还没当前会话，则跳过
        if (!state.currentConversation.conversationID) {
          return
        }
        if (Array.isArray(data)) {
          // 筛选出当前会话的消息
          const result = data.filter(item => item.conversationID === state.currentConversation.conversationID)
          state.currentMessageList = [...state.currentMessageList, ...result]
          // state.currentMessageList = mergeMessageList(state.currentMessageList, result);
        } else if (data.conversationID === state.currentConversation.conversationID) {
          state.currentMessageList = [...state.currentMessageList, data]
          // state.currentMessageList = mergeMessageList(state.currentMessageList, [data]);
        }
    },

    /**
     * 重置当前消息信息
     * @param {*} state 
     */
    resetCurrentMemberList(state) {
        state.currentMemberList = []
    },


    updateCurrentUserProfile(state, userProfile) {
        state.currentUserProfile = userProfile
    },
    toggleIsLogin(state, isLogin) {
        state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
    },
    toggleIsSDKReady(state, isSDKReady) {
        state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
    },
    reset(state) {
        Object.assign(state, {
            currentUserProfile: {},
            isLogin: false,
            isSDKReady: false // TIM SDK 是否 ready
        })
    },
    updateConversationID(state, conversationID) {
        state.currentConversation.conversationID = conversationID 
    },
    /**
     * 存群成员信息
     * @param {*} state 
     * @param {*} memberList 
     */
    updateCurrentMemberList(state, memberList) {
        state.currentMemberList = [...state.currentMemberList, ...memberList]
    },
    /**
     * 存群 groupList 信息
     * @param {*} state 
     * @param {*} groupList 
     */
    updateGroupList(state, groupList) {
        state.groupList = groupList
    },
}   
export default mutations