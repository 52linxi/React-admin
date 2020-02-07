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
import { Link } from "react-router-dom";
import { getCategoryListAsync } from "../../../redux/action";
import { reqAddProduct, reqUpdateProduct } from "../../../api";

import "./index.less";
//富文本的样式
import "braft-editor/dist/index.css";
//结构属性便于下面简洁使用
const { Item } = Form;
const { Option } = Select;
@connect(state => ({ categories: state.categories }), { getCategoryListAsync })
@Form.create()
class ProductForm extends Component {
  //只用发一次请求
  componentDidMount() {
    if (!this.props.categories.length) {
      //redux中没有数据才发请求
      this.props.getCategoryListAsync();
    }
  }
  //封装方法 判断是修改还是添加商品
  isAddProduct = () => {
    return this.props.location.pathname.indexOf("/update/") === -1;
  };

  submit = e => {
    e.preventDefault();
    //校验表单收集数据
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
        const { name, desc, categoryId, price, detail } = value;

        //复用Promise代码
        let promise = null;
        const isAddProduct = this.isAddProduct();

        if (isAddProduct) {
          //添加商品
          //发送添加商品请求
          promise = reqAddProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML()
          });
        } else {
          //修改商品
          //发送修改商品请求
          promise = reqUpdateProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML(),
            productId: this.props.match.params.id
          });
        }

        promise
          .then(() => {
            message.success(`${isAddProduct ? "添加" : "修改"}商品成功`);
            //跳转页面
            this.props.history.push("/product");
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };
  //处理分类ID的逻辑
  handleCategoryId = isAddProduct => {
    if (isAddProduct) {
      return "0";
    }
    const {
      categories,
      location: {
        state: { categoryId }
      }
    } = this.props;

    const category = categories.find(category => category._id === categoryId);

    if (category) {
      //分类存在
      return categoryId;
    } else {
      //分类不存在
      return "0";
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      categories,
      location
    } = this.props;

    //获取路由传递的数据
    const { state } = location;

    //判断是修改还是添加商品
    const isAddProduct = this.isAddProduct();

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
            <Link to="/product">
              <Icon type="arrow-left" className="go-back" />
            </Link>
            {isAddProduct ? "添加商品" : "修改商品"}
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
              ],
              initialValue: isAddProduct ? "" : state.name ///默认值
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述:">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ],
              initialValue: isAddProduct ? "" : state.desc ///默认值
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类:">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ],
              initialValue: this.handleCategoryId(isAddProduct) //默认值
              //默认值
              //initialValue:1
            })(
              <Select placeholder="请选择商品分类">
                <Option key="0" value="0">
                  暂无分类
                </Option>
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
              ],
              initialValue: isAddProduct ? "" : state.price ///默认值
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
              ],
              initialValue: isAddProduct
                ? ""
                : BraftEditor.createEditorState(state.detail) ///默认值
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

export default ProductForm;
