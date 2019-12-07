const actions = {

    /**
     * 获取消息列表
     * 调用时机：打开某一会话时或下拉获取历史消息时
     * @param {Object} context
     * @param {String} conversationID
     */
    getMessageList(context, conversationID) {
        if (context.state.isCompleted) {
          alert('已经没有更多的历史消息了哦')
          return
        }
        const { nextReqMessageID, currentMessageList } = context.state
        tim.getMessageList({ conversationID, nextReqMessageID, count: 15 }).then(imReponse => {
          // 更新messageID，续拉时要用到
          context.state.nextReqMessageID = imReponse.data.nextReqMessageID
          context.state.isCompleted = imReponse.data.isCompleted
          // 更新当前消息列表，从头部插入
          context.state.currentMessageList = [...imReponse.data.messageList, ...currentMessageList]
        })
    },

    /**
     * 切换会话
     * 调用时机：切换会话时
     * @param {Object} context
     * @param {String} conversationID
     */
    checkoutConversation(context, conversationID) {
        context.commit('resetCurrentMemberList')
        // 1.切换会话前，将切换前的会话进行已读上报
        if (context.state.currentConversation.conversationID) {
          const prevConversationID = context.state.currentConversation.conversationID
          tim.setMessageRead({ conversationID: prevConversationID })
        }
        // 2.待切换的会话也进行已读上报
        tim.setMessageRead({ conversationID })
        // 3. 获取会话信息
        return tim.getConversationProfile(conversationID).then(({ data }) => {
          // 3.1 更新当前会话
          context.commit('updateCurrentConversation', data.conversation)
          // 3.2 获取消息列表
          context.dispatch('getMessageList', conversationID)
          // 3.3 拉取第一页群成员列表
          if (data.conversation.type === TIM.TYPES.CONV_GROUP) {
            return context.dispatch('getGroupMemberList', data.conversation.groupProfile.groupID)
          }
          return Promise.resolve()
        })
    },
    
    /**
     * 获取群成员信息
     * @param {*} context 
     * @param {*} groupID 
     */
    getGroupMemberList(context, groupID) {
      return tim.getGroupMemberList({
        groupID: groupID,
        offset: context.state.currentMemberList.length,
        count: 30
      }).then((imResponse) => {
        context.commit('updateCurrentMemberList', imResponse.data.memberList)
        return imResponse
      })
    },

    getGroupInfo(context, groupID) {
      if (groupID) {
        return context.dispatch('getGroupMemberList', groupID)
      }
      return Promise.resolve()
    }
}
export default actions