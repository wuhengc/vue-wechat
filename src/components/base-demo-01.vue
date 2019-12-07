<template>
  <div>
    <div class="main">
      <div class="topDiv">
        <span>实名制与分账制情况</span>
      </div>
      <div class="centDiv">
        <div class="title">
          <p v-for="item,index in list">{{item}}</p>
        </div>
        <div class="info">
          <table border="1" cellpadding="15px">
            <tr v-for="item,index in 3">
              <td v-for="item,index in 4">
                <div class="details">
                  <div class="details-left"><i class="iconfont iconanquanmaogongren"></i></div>
                  <div class="details-right"><span>今日考勤人员</span><span>{{index+5000}}</span></div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="topDiv">
        <span>人员分布情况</span>
      </div>
      <div class="bottomDiv">
        <div class="tabType">
          <span :class="{'active':isActive==1}" @click="choose(1)">省份分布</span>
          <span :class="{'active':isActive==2}" @click="choose(2)">年龄分布</span>
          <span :class="{'active':isActive==3}" @click="choose(3)">性别分布</span>
        </div>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: ['人员概况', '劳务工人', '管理人员', '分账制概况'],
        isActive: 1,
        myChart:""
      }
    },
    mounted() {
      this.initecharts()
    },
    methods: {
      initecharts() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        // 自适应图表
        window.onresize = this.myChart.resize;
        // 绘制图表
        this.myChart.setOption({
          title: {
            //text: '世界人口总量',
            //subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['2011年', '2012年']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['四川', '湖南', '河南', '广西', '贵州', '云南', '江西', '安徽', '广东']
          },
          series: [{
            itemStyle: {
              normal: {
                color: '#2F65F9'
              }
            },
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807, 5555, 6666, 7777, 88888]
          }]
        });
      },
      choose(num) {
        this.isActive = num
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .main {
    display: flex;
    flex-flow: column;
    background-color: #03184D;

    .topDiv {
      background-color: #081E5A;
      padding: 5px;
      display: inline-block;
      vertical-align: middle;

      span {
        color: #A2B9E5;
      }
    }

    .centDiv {
      background-color: #030b20;
      margin: 5px 0;

      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        color: #FFFFFF;
        font-size: 14px;
        height: 25px;
      }

      .info {
        text-align: center;

        table {
          width: 100%;
          height: 190px;
          border: 0px solid #999;
          border-collapse: separate;
          border-spacing: 15px;
          margin: auto;

          td {
            color: #FFFFFF;
            font-size: 14px;
            background-color: #0a2341;
            padding: 5px;
            border: 0px solid #999;
          }
        }

        .details {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          font-size: 12px;

          .details-left {
            text-align: center;
            line-height: 32px;
          }

          .details-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
      }
    }

    .bottomDiv {
      background-color: #030b20;
      margin: 5px 0;

      .tabType {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        font-size: 15px;
        color: #FFFFFF;

        span {
          cursor: pointer;
          user-select: none;

          &:hover {
            color: #C89539;
          }

        }

        .active {
          color: #C89539;
          position: relative;

          &::before {
            position: absolute;
            content: "";
            border-color: transparent transparent #C89539;
            border-style: solid;
            border-width: 0 5px 6px;
            left: 24px;
            top: 19px;
          }
        }
      }

      #myChart {
        z-index: 99;
      }
    }
  }

</style>
