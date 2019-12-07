<template>
    <div class="main">
        <div class="main-title">
            <p class="title-server">地图的七大功能与服务</p>
            <span class="video-ico"></span>
        </div>
        <div class="main-content">
            <span class="line" :style="spanCss"></span>
            <ul class="content-ul">
                <li v-for="item,index in tabList" :class="{'active':index==isActive}" @mouseover="selectStyle(index) ">
                    <span>{{item}}</span><i></i>
                </li>
            </ul>
        </div>
        <div class="mian-pic">
            <div class="pic-left"></div>
            <div class="pic-right">
                <h2 class="dw"></h2>
                <p><span></span>全面准确的路网信息、各类电子眼、超速动态提醒，避免违章</p>
                <p><span></span>全新沉浸式悬浮界面设计，图区更大，导航信息更聚合</p>
                <p><span></span>支持驾车、公交、骑行、步行(含AR)多种智能导航方式</p>
            </div>
        </div>

        <!-- 开发文档 -->
        <div class="main-doc">
            <div class="doc-wrapper">
                <p class="delevopTit">开发文档</p>
                <ul class="doc-detilas">
                    <li v-for="item,index in docList">
                        <div>
                            <div class="doc-title">
                                <div class="div-title">
                                    <a href="" v-for="item,index in item.item.slice(0,3)">{{item}}<span></span></a>
                                </div>
                                <div class="div-title">
                                    <a href="" v-for="item,index in item.item.slice(3)">{{item}}<span></span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabList: ['定位', '地图', '轨迹', '路线规划', '导航', '路况', '搜索'],
            isActive: 0,
            spanCss: {
                width: "42px",
                left: "238px",
                transition: 'all .6s ease'
            },
            docList: [
                {
                    item :['iOS地图 SDK', 'iOS定位 SDK', 'iOS鹰眼轨迹 SDK', 'iOS导航 SDK', 'iOS全景 SDK']
                },
                {
                    item :['Android地图 SDK', 'Android定位 SDK', 'Android鹰眼轨迹 SDK', 'Android导航 SDK', 'Android全景 SDK', 'Android AR识别 SDK']
                },
                {
                    item :['JavaScript API', '微信小程序 JavaScript API']
                },
                {
                    item :['鹰眼轨迹服务', 'LBS云', 'Web服务 API', '全景静态 API', '静态图 API']
                },
                {
                    item :['坐标拾取器', '地图生成器', '地图名片', '坐标系说明', '地图编辑工具']
                },
                {
                    item :['API控制台', '鹰眼轨迹管理平台', '地图开发资源', '数据管理平台']
                }
            ]
        }
    },
    methods: {
        selectStyle(num) {
            this.isActive = num
            if(num == 1) {
                this.spanCss.left = "362px"
                this.spanCss.width = "42px"

            } else if (num == 2) {
                this.spanCss.left = "483px"
                this.spanCss.width = "42px" 

            } else if (num == 3) {
                this.spanCss.left = "612px"
                this.spanCss.width = "65px" 

            } else if (num == 4) {
                this.spanCss.left = "764px"
                this.spanCss.width = "42px" 
            } else if (num == 5) {
                this.spanCss.left = "886px"
                this.spanCss.width = "42px" 

            } else if (num == 6) {
                this.spanCss.left = "1011px"
                this.spanCss.width = "42px" 

            } else if (num == 0) {
                this.spanCss.left = "238px"
                this.spanCss.width = "42px" 

            } 
        }
    }
}
</script>

<style lang="less" scoped>
    .main {
        .main-title {
            display: flex;
            text-align: center;
            justify-content: center;
            .title-server {
                text-align: center;
                font-family: "PingFangSC-Thin", "Microsoft YaHei";
                font-size: 36px;
                margin-top: 80px;
                height: 36px;
                color: #141419;
                line-height: 36px;
                margin: 0;
            }
            .video-ico {
                background: url("http://mapopen-website-wiki.cdn.bcebos.com/homePage/images/hp-video-bt.png");
                display: inline-block;
                width: 80px;
                height: 38px;
                background-size: 80px 76px;
                margin: -4px 0 0 20px;
            }
        }
        .main-content {
            margin-top: 25px;
            text-align: center;
            position: relative;
            .line {
                height: 3px;
                width: 42px;
                display: inline-block;
                background: #f5533d;
                position: absolute;
                bottom: -8px;
                left: 246px;
            }
            .content-ul {
                display: flex;
                justify-content: center;
                font-size: 16px;
                color: #273b4e;
                list-style: none outside none;
                margin: 0;
                padding: 0;
                .active {
                    color: #f5533d;
                }
                li:active {
                    color: #f5533d;
                    transition:3s;
                }
                li {
                    margin: 0 23px;
                    display: flex;
                    cursor: pointer;
                    &:hover {
                        color: #f5533d;
                        &:active {
                            color: #f5533d;
                        }
                    }
                    &:last-child {
                        i {
                            visibility: hidden;
                        }
                    }
                    i {
                        width: 5px;
                        height: 5px;
                        background: #D0D0D0;
                        border-radius: 50%;
                        margin-top: 9px;
                        margin-left: 40px;
                    }
                }
            }
        }
        .mian-pic {
            margin-top: 80px;
            display: flex;
            justify-content: center;
            .pic-left {
                width: 600px;
                height: 314px;
                background: url('https://mapopen-website-wiki.cdn.bcebos.com/index/newIndex/bg-location.png');
                background-size: 100% 100%;
            }
            .pic-right {
                width: 600px;
                height: 314px;
                text-align: left;
                p {
                    font-size: 14px;
                    color: #333;
                    span {
                        width: 6px;
                        height: 6px;
                        display: inline-block;
                        background: #f5533d;
                        margin-right: 10px;
                        margin-bottom: 1px;
                    }
                }
                .dw {
                    background: url('http://mapopen-website-wiki.cdn.bcebos.com/index/newIndex/service-location.png')  no-repeat left center;
                    width: 368px;
                    height: 42px;
                    margin: 0;
                }
            }
        }
        .main-doc {
            margin-top: 100px;
            background: #fff;
            text-align: center;
            .doc-wrapper {
                width: 1140px;
                height: 550px;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 80px 0 #EAEEF2;
                margin: 0 auto;
                .delevopTit {
                    font-size: 36px;
                    color: #333;
                    font-family: 'PingFangSC-Thin', 'Microsoft YaHei';
                    padding-top: 35px;
                    margin: 0;
                    margin-bottom: 28px;
                }
                .doc-detilas {
                    list-style: none;
                    display: flex;
                    margin: 0;
                    padding: 0;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    li {
                        border-bottom: 1px solid rgba(207,207,207,0.4);
                        min-height: 90px;
                        padding-top: 29px;
                        .doc-title {
                            display: flex;
                            flex-direction: column;
                            width: 450px;
                            .div-title {
                                text-align: left;
                                margin: 10px 0;
                                &:last-child {
                                    span {
                                        opacity:0;
                                    }
                                }
                            }
                            a {
                                font-family: pingPingFangSC-Regular;
                                color: #333;
                                text-align: center;
                                font-size: 14px;

                                text-decoration: none;
                                height: 14px;
                                line-height: 14px;
                                padding-right: 16px;
                                &:hover {
                                    color: #f5533d;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>