import React, { Component } from "react";
import { Button, Icon } from "antd";
import screenfull from "screenfull";
import "./index.less";

export default class HeaderMain extends Component {
  //定义状态
  state = {
    isScreenfull: false
  };
  //绑定图标变化 触发全屏改变
  componentDidMount() {
    screenfull.on("change", this.handleScreenFullChange);
  }
  // 更新全屏的状态
  handleScreenFullChange = () => {
    this.setState({
      isScreenfull: !this.state.isScreenfull
    });
  };
  //解绑事件 不是react绑定的事件 需要解绑 避免内存泄漏
  componentWillUnmount() {
    screenfull.off("change", this.handleScreenFullChange);
  }
  //绑定点击事件切换全屏
  screenFull = () => {
    screenfull.toggle();
  };
  render() {
    //获取isScreenfull方法 判断图标变化
    const { isScreenfull } = this.state;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button className="header-main-lang" size="small">
            Endlish
          </Button>
          <span>hello,admin </span>
          <Button size="small" type="link">
            退出
          </Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">商品管理</span>
          <span className="header-main-rightcc ">中国时间：08：24分</span>
        </div>
      </div>
    );
  }
}
