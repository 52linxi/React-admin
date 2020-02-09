import React, { Component } from "react";
import { Card, Icon, Descriptions } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCategoryListAsync } from "../../../redux/action";
import { reqGetProduct } from "../../../api";
import "./index.less";

@connect(state => ({ categories: state.categories }), { getCategoryListAsync })
class ProductDetail extends Component {
  state = {
    product: {}
  };
  //发送更新的请求
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryListAsync();
    }
    //判断状态
    if (!this.props.location.state) {
      reqGetProduct(this.props.match.params.id).then(res => {
        this.setState({
          product: res
        });
      });
    }
  }
  render() {
    const {
      location: { state },
      categories
    } = this.props;
    //解构赋值 后面|| this.state.product不懂啥意思 删了也没事 反正也是吵得
    const { name, desc, price, categoryId, status, detail } =
      state || this.state.product;
    //检查商品分类ID和商品id是否一样
    const category = categories.find(category => category._id === categoryId);
    //不一样给个默认值 暂无分类
    const categoryName = category ? category.name : "暂无分类";
    return (
      <Card
        title={
          <div>
            <Link to="/product">
              <Icon type="arrow-left" className="go-back" />
            </Link>
            商品详情
          </div>
        }
      >
        <Descriptions bordered>
          <Descriptions.Item label="商品名称">{name}</Descriptions.Item>
          <Descriptions.Item label="商品描述">{desc}</Descriptions.Item>
          <Descriptions.Item label="商品价格">￥{price}</Descriptions.Item>
          <Descriptions.Item label="商品分类">{categoryName}</Descriptions.Item>
          <Descriptions.Item label="商品状态" span={2}>
            {status === 1 ? "下架" : "上架"}
          </Descriptions.Item>
          <Descriptions.Item label="商品详情">
            {/*dangerouslySetInnerHTML 危险操作 官网推荐 展示文字*/}
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}

export default ProductDetail;
