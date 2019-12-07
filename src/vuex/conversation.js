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
        },
        /**
         * 重置当前会话
         * 调用时机：需要重置当前会话时，例如：当前会话是一个群组，正好被踢出群时（被踢群事件触发），重置当前会话
         * @param {Object} state
         */
        resetCurrentConversation(state) {
            state.currentConversation = {}
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
        }
    }
}

export default conversation