import React, { Component } from "react";
//antd插件库
import { Menu, Icon } from "antd";
//引入跳转网页和高阶组件获取三大属性
import { Link, withRouter } from "react-router-dom";
//引入菜单
import menus from "../../../config/menus";

const { SubMenu, Item } = Menu;
//给组件传递三大组件的高阶组件
@withRouter
class LeftNav extends Component {
  //创建menus菜单 动态展示在导航
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        //二级菜单
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(cMenu => this.createMenuItem(cMenu))}
          </SubMenu>
        );
      } else {
        //一级菜单
        return this.createMenuItem(menu);
      }
    });
  };
  //定义复用代码
  createMenuItem = menu => {
    return (
      <Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Item>
    );
  };
  //定义高亮是否在子菜单而展开
  findOpenKeys = (pathname, menus) => {
    //find方法 true 会返回一个正确值， fasle 返回undefind
    const menu = menus.find(menu => {
      //判断是否有子菜单
      if (menu.children) {
        return menu.children.find(Cmenu => Cmenu.path === pathname);
      }
    });

    if (menu) {
      return menu.path;
    }
  };

  render() {
    //利用高阶组件获取location.pathname方法
    const { pathname } = this.props.location;
    //调用方法 查找路劲对应是否展开
    const openkeys = this.findOpenKeys(pathname, menus);

    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]} //选中菜单高亮
        defaultOpenKeys={[openkeys]} //展开子菜单
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}

export default LeftNav;
