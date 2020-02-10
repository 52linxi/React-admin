import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
/*
  在React中使用echarts
*/
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push("类目" + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}

export default class Bar extends Component {
  getOption = () => {
    // option对象具体参数：参照echarts文档
    return {
      title: {
        text: "柱状图动画延迟"
      },
      legend: {
        data: ["bar", "bar2"]
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ["stack", "tiled"]
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [
        {
          name: "bar",
          type: "bar",
          data: data1,
          animationDelay: function(idx) {
            return idx * 10;
          }
        },
        {
          name: "bar2",
          type: "bar",
          data: data2,
          animationDelay: function(idx) {
            return idx * 10 + 100;
          }
        }
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function(idx) {
        return idx * 5;
      }
    };
  };

  render() {
    return <ReactEcharts option={this.getOption()} style={{height:500}} />;
  }
}
