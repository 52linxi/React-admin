import React, { Component } from 'react'
import withCheckLogin from '../../containers/with-check-login'
//判断是否登录 高阶组件
@withCheckLogin
class Home extends Component {
  render() {
    return (
      <div>
        home...
      </div>
    )
  }
}

export default Home
