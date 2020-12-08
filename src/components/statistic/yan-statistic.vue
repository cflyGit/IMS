<template>
    <section class="dashboard-wrapper">
        <a-row class="row-mid">
            <a-col class="chart-wrapper" :span="24">
                <canvas class="line-chart" style="position: relative; height:60vh; width:95%" ref="lineChart"/>
            </a-col>
        </a-row>
        <a-row class="row-bottom">
            <a-col class="chart-wrapper" :span="6">
                <canvas class="bar-chart" style="position: relative; height:40vh; width:95%" ref="barChart"/>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="bubble-chart" style="position: relative; height:40vh; width:95%" ref="bubbleChart"/>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="pie-chart" style="position: relative; height:40vh; width:95%" ref="pieChart"/>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="radar-chart" style="position: relative; height:40vh; width:95%" ref="radarChart"/>
            </a-col>
        </a-row>

    </section>
</template>

<script>
    import Chart from 'chart.js'
    import moment from 'moment'
    import {statisticDataDemo} from "../../utils/statisticDataDemo";
    export default {
        name: "yan-statistic",

        async mounted() {
            await this.$nextTick();
            this.initChart('lineChart', 'line');
            this.initChart('barChart', 'bar');
            this.initChart('bubbleChart', 'bubble');
            this.initChart('pieChart', 'pie', {scales: null});
            this.initChart('radarChart', 'radar', {scales: null});
            this.initData();
            for (let instance in this.chartInstance) {
                this.generateData(this.chartInstance[instance])
            }
        },
        data() {
            return {
                stargazers_count: 0,
                subscribers_count: 0,
                forks: 0,
                open_issues_count: 0,
                chartInstance: {},
                timer: null
            }
        },
        beforeDestroy() {
            for (let instance in this.chartInstance) {
                clearInterval(this.chartInstance[instance].timer)
            }
        },

        methods: {
            initData() {
                statisticDataDemo().then(res => {
                    this.stargazers_count = res.data.stargazers_count;
                    this.subscribers_count = res.data.subscribers_count;
                    this.forks = res.data.forks;
                    this.open_issues_count = res.data.open_issues_count
                })
            },
            updateScale (chart, head) {
                chart.options.scales.xAxes[0].ticks.min = head.x;
            },
            generateData (chart) {
                const type = chart.config.type;
                const fn = function () {
                    let head = chart.data.datasets[0].data;

                    if (type === 'pie' || type === 'radar') {
                        chart.data.labels.push(moment(new Date()).format('h:mm:ss'));
                        chart.data.labels.length > 7 ? chart.data.labels.shift(): undefined;
                        chart.data.datasets.map(dataset => {
                            dataset.data.push(Math.round(Math.random()*200));
                            if (dataset.data.length > 7) {
                                dataset.data.shift();
                            }
                        });
                    } else {
                        chart.data.datasets.map(dataset => {
                            dataset.data.push({x: moment(new Date()), y:Math.round(Math.random()*200)});
                            if (dataset.data.length > 19) {
                                dataset.data.shift();
                            }
                        });
                        this.updateScale(chart, head[0]);
                    }
                    chart.update();
                }.bind(this);
                fn();
                chart.timer = setInterval(fn, 2000);
            },
            initChart (ref, type = 'line', config = {}) {
                const salesData = {
                    labels: type === 'pie' || type === 'radar' ? [] : ["Front", "Middle", "Back"],
                    datasets: [
                        {
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                            label: "基地",
                            backgroundColor: "rgba(246,114,128,0.35)",
                            borderColor: "rgb(246,114,128)",
                            pointBackgroundColor: "rgb(246,114,128)",
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointHoverBorderColor: "rgb(255,252,107)",
                            data: []
                        },
                        {
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                            label: "导师",
                            backgroundColor: "rgba(155,227,222, 0.35)",
                            borderColor: "rgb(155,227,222)",
                            pointBackgroundColor: "rgb(155,227,222)",
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointHoverBorderColor: "rgb(255,252,107)",
                            data: []
                        },
                        {
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                            label: "学生",
                            backgroundColor: "rgba(19, 71, 34, 0.35)",
                            borderColor: "rgba(88, 188, 116, 1)",
                            pointBackgroundColor: "rgba(88, 188, 116, 1)",
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointHoverBorderColor: "rgb(255,252,107)",
                            data: []
                        }
                    ]
                };
                const ctx = this.$refs[ref].getContext("2d");
                const options = {
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Time ( UTC )'
                            },
                            type: 'time',
                            time: {
                                displayFormats: {
                                    second: 'h:mm:ss'
                                }
                            },
                            ticks: {
                                source: 'data',
                                min: moment(new Date()).subtract(3,'s'),
                                maxRotation: 90,
                                minRotation: 0
                            }
                        }],
                    },
                    pointDotRadius : 6,
                    pointDotStrokeWidth : 2,
                    datasetStrokeWidth : 3,
                    scaleShowVerticalLines: false,
                    scaleGridLineWidth : 2,
                    scaleShowGridLines : true,
                    scaleGridLineColor : "rgba(225, 255, 255, 0.02)",
                    scaleOverride: true,
                    scaleSteps: 9,
                    scaleStepWidth: 500,
                    scaleStartValue: 0,
                    responsive: true
                };
                this.chartInstance[ref] = new Chart(ctx, {
                    type: type,
                    data: salesData,
                    options: Object.assign(options, config)
                });

            }
        }
    }
</script>

<style scoped>

</style>