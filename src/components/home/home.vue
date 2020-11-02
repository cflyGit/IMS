<template>
    <section  class="home-index">
        <a-carousel arrows>
            <div
                    slot="prevArrow"
                    class="custom-slick-arrow"
                    style="left: 10px;zIndex: 1"
            >
                <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
                <a-icon type="right-circle" />
            </div>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </a-carousel>

        <a-row class="row-top">
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
<!--                文字提示气泡-->
                <a-tooltip :mouse-enter-delay="0.5" title="Starts of ant-design">
                    <div class="block-wrapper" >
                        <a-icon class="star" type="star"></a-icon>
                        <span>{{this.star_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Starts of ant-design">
                    <div class="block-wrapper">
                        <a-icon class="star" type="message"></a-icon>
                        <span>{{this.star_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Starts of ant-design">
                    <div class="block-wrapper">
                        <a-icon class="star" type="save"></a-icon>
                        <span>{{this.star_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Starts of ant-design">
                    <div class="block-wrapper">
                        <a-icon class="star" type="eye"></a-icon>
                        <span>{{this.star_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
        </a-row>

        <a-row class="row-mid">
            <a-col class="chart-wrapper">
                <canvas class="line-chart" style="position: relative; height: 60vh; width: 99%; background: #4397f8; border-radius: 10px">
                </canvas>
            </a-col>
        </a-row>

        <a-row class="row-bottom">
            <a-col class="chart-wrapper" :span="6">
                <canvas class="line-chart" style="position: relative; height: 60vh; width: 95%; background: #666666"></canvas>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="line-chart" style="position: relative; height: 60vh; width: 95%; background: #5ca274"></canvas>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="line-chart" style="position: relative; height: 60vh; width: 95%; background: rgba(224,58,32,0.94)"></canvas>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="line-chart" style="position: relative; height: 60vh; width: 95%; background: #4397f8"></canvas>
            </a-col>
        </a-row>
    </section>
</template>

<script>
    export default {
        name: "index",

        data() {
            return {
                star_count: 1314,
            }
        },
    }
</script>

<style scoped>
    .ant-carousel >>> .slick-slide {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
    }

    .ant-carousel >>> .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
    }
    .ant-carousel >>> .custom-slick-arrow:before {
        display: none;
    }
    .ant-carousel >>> .custom-slick-arrow:hover {
        opacity: 0.5;
    }

    .ant-carousel >>> .slick-slide h3 {
        color: #fff;
    }

    .block-wrapper{
        height: 200px;
        line-height: 200px;
        padding: 10px 20px 20px 10px;
        border-radius: 10px;
        width: 95%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #5ca274;
    }

    .row-top {
        padding: 10px 20px 20px 10px;
    }

    .row-mid{
        margin: 0 auto;
        padding: 10px 20px 20px 10px;
    }

    .row-bottom{
        padding: 10px 20px 20px 10px;
    }

    .wrapper{
        border-radius: 10px;
        justify-content: center;
    }

    .line-chart {
        border-radius: 10px;
    }
</style>