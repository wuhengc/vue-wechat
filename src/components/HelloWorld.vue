<template>
  <div class="hello">
    <h1>flex-direction: column</h1>
    <div class="box">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>flex-direction: row</h1>
    <div class="box-row">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>flex-wrap: wrap</h1>
    <div class="box-wrap">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>flex-wrap: reverse</h1>
    <div class="box-reverse">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>justify-content属性 flex-start</h1>
    <div class="box-jus">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>justify-content属性 flex-end</h1>
    <div class="box-end">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>justify-content属性 flex-center</h1>
    <div class="box-center">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>justify-content属性 space-between</h1>
    <div class="box-space-between">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>justify-content属性 space-around</h1>
    <div class="box-space-around">
      <div class="box-item"></div>
      <div class="box-item"></div>
      <div class="box-item"></div>
    </div>
    <h1>align-items属性 flex-start</h1>
    <div class="box-flex-start">
      <div class="box-item"></div>
      <div class="box-item" style="height: 200px;"></div>
      <div class="box-item" ></div>
    </div>
    <h1>align-items属性 flex-end</h1>
    <div class="box-flex-end">
      <div class="box-item"></div>
      <div class="box-item" style="height: 200px;"></div>
      <div class="box-item"></div>
    </div>
    <h1>align-items属性 flex-center</h1>
    <div class="box-flex-center">
      <div class="box-item"></div>
      <div class="box-item" style="height: 200px;"></div>
      <div class="box-item"></div>
    </div>
    <h1>align-items属性 flex-baseline</h1>
    <div class="box-flex-baseline">
      <div class="box-item">text</div>
      <div class="box-item" style="height: 200px;">text</div>
      <div class="box-item">text</div>
    </div>
  </div>
</template>

<script>
import tim from '../tim'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toAccount: 'user2',
      currentConversationType: 'C2C',
      messageContent: "铁桥你好"
    }
  },
  methods: {
    sendTextMessage() {
      const message = this.tim.createTextMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: { text: this.messageContent }
      })
      this.tim.sendMessage(message)
    }
  },
  mounted() {
    tim.login({
      userID: "user0",
      userSig: window.genTestUserSig('user0').userSig
    })
    .then((e) => {
      console.log(e, "******************")
    })
    .catch(imError => {
      if (imError.code === 2000) {
        window.$message.error(imError.message + ', 请检查是否正确填写了 SDKAPPID')
      } else {
        window.$message.error(imError.message)
      }
    })

    this.sendTextMessage()
  },
  destroyed () {
    tim.logout().then((e) => {
      console.log(e ,'注销登录')
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .box {
    display: flex;
    flex-direction: column;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 0;
    }
  }
  .box-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }
  }
  .box-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px 0;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-reverse {
    display: flex;
    flex-flow: row  wrap-reverse;
    margin: 20px 0;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-jus {
    display: flex;
    justify-content: flex-start;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-end {
    display: flex;
    justify-content: flex-end;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-center {
    display: flex;
    justify-content: center;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-space-between {
    display: flex;
    justify-content: space-between;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-space-around {
    display: flex;
    justify-content: space-around;
    .box-item {
      background-color: rgb(232, 128, 36);
      width: 100px;
      height: 100px;
      margin: 10px 10px;
    }
  }
  .box-item {
    background-color: rgb(232, 128, 36);
    width: 100px;
    height: 100px;
    margin: 10px 10px;
  }
  .box-flex-start {
    display: flex;
    align-items: flex-start;
  }
  .box-flex-end {
    display: flex;
    align-items: flex-end;
  }
  .box-flex-center {
    display: flex;
    align-items: center;
  }
  .box-flex-baseline {
    display: flex;
    align-items: baseline;
  }
</style>
