<template>
  <div class="content">
    <div class="info"><span>项目信息</span></div>
    <div class="prjDeyalis">
      <ul>
        <li v-for="item,index in list">
          <span>{{item}}</span>
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list : ['监督编号：Q45454545', '项目状态：在建', '项目类型：房屋建筑', '项目类型/建筑功能：公共事业', '施工阶段：基础',
            '形象进度：/', '项目面积：24545', '项目造价（万）：5152.19', '投资来源：财务投资', '项目地址：深圳罗湖区',
            '建设单位：深圳市建筑工务曙工工程管理中心', '建设负责人/电话：1868314545'
        ]
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .content {
    background-color: rgb(3, 11, 32);
    border: 2px solid rgb(170, 200, 248);
    margin: 30px;

    .info {
      display: flex;
    }

    .info {
      span {

        color: rgb(170, 200, 248);
        font-size: 20px;
        padding: 0 20px;
        margin-top: 20px;
      }
    }

    .prjDeyalis {
      padding: 20px;
      ul {
        display: flex;
        flex-flow: column;
        margin: 0;
        padding: 0;

        li {
          display: flex;
          justify-content: space-around;
          background: #999;
          padding: 15px;

          &:nth-child(even) {
            background: #ddd;
          }

          span {
            width: 50%;
            text-align: left;
          }
        }
      }
    }
  }

</style>
