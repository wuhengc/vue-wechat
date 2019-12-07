const conversation = {
    state: {
        isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
        conversationList: [] // 会话列表
    },
    mutations: {
        /**
         * 更新会话列表
         * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
         * @param {Object} state
         * @param {Conversation[]} conversationList
         */
        updateConversationList(state, conversationList) {
            state.conversationList = conversationList
        }
    }
}

export default conversation