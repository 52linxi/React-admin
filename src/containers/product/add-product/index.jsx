import React, { Component } from "react";
import {
  Form,
  Card,
  Icon,
  Input,
  Button,
  Select,
  InputNumber,
  message
} from "antd";
//富文本组件
import BraftEditor from "braft-editor";
import { connect } from "react-redux";
import { getCategoryListAsync } from "../../../redux/action";
import { reqAddProduct } from "../../../api";

import "./index.less";
//富文本的样式
import "braft-editor/dist/index.css";
//结构属性便于下面简洁使用
const { Item } = Form;
const { Option } = Select;
@connect(state => ({ categories: state.categories }), { getCategoryListAsync })
@Form.create()
class AddProduct extends Component {
  //只用发一次请求
  componentDidMount() {
    if (!this.props.categories.length) {
      //redux中没有数据才发请求
      this.props.getCategoryListAsync();
    }
  }
  submit = e => {
    e.preventDefault();
    //校验表单收集数据
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
        const { name, desc, categoryId, price, detail } = value;
        //发送请求
        reqAddProduct({
          name,
          desc,
          categoryId,
          price,
          detail: detail.toHTML()
        })
          .then(() => {
            message.success("添加商品成功");
            //跳转页面
            this.props.history.push("/product");
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };
  //回退功能
  goBack=()=>{
    this.props.history.goBack();
  }
  render() {
    const {
      form: { getFieldDecorator },
      categories
    } = this.props;
    const formItemLayout = {
      labelCol: {
        //左边文字占地
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        //右边区域占地
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" className="go-back" onClick={this.goBack} />
            添加商品
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称:">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称"
                }
              ]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述:">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ]
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类:">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ]
              //默认值
              //initialValue:1
            })(
              <Select placeholder="请选择商品分类">
                {categories.map(category => {
                  return (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "请输入价格"
                }
              ]
            })(
              <InputNumber
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/￥\s?|(,*)/g, "")}
                className="product-price"
              />
            )}
          </Item>
          <Item label="商品详情:" wrapperCol={{ span: 20 }}>
            {getFieldDecorator("detail", {
              rules: [
                {
                  required: true,
                  message: "请输入商品详情"
                }
              ]
            })(<BraftEditor className="product-detail" />)}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default AddProduct;
