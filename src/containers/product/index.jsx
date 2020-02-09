import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";

import {
  reqGetProductList,
  reqSearchProduct,
  reqUpdateProductStatus
} from "../../api";

export default class Product extends Component {
  state = {
    productList: [],
    total: 0,
    isLoading: false,
    searchType: "productName",
    searchValue: "",
    current:1
  };

  currentSearchValue = "";

  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "商品价格",
      dataIndex: "price",
      render: price => {
        return `￥${price}`;
      }
    },
    {
      title: "商品状态",
      //dataIndex: "status",
      render: ({ _id, status }) => {
        if (status === 1) {
          return (
            <div>
              <Button type="primary" onClick={this.updateStatus(_id, status)}>
                上架
              </Button>
              <span>已下架</span>
            </div>
          );
        }

        return (
          <div>
            <Button type="primary" onClick={this.updateStatus(_id, status)}>
              下架
            </Button>
            <span>已上架</span>
          </div>
        );
      }
    },
    {
      title: "操作",
      //dataIndex: 'xxx',
      render: product => {
        return (
          <div>
            <Button type="link" onClick={this.showProduct(product)}>
              详情
            </Button>
            <Button type="link" onClick={this.showProduct(product, "update/")}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];

  //更新商品状态的方法
  updateStatus = (productId, status) => {
    return () => {
      const newStatus = 3 - status;
      reqUpdateProductStatus(productId, newStatus)
        .then(res => {
          //更新列表的状态
          this.setState({
            productList: this.state.productList.map(product => {
              if (product._id === productId) {
                return {
                  //展开对象的所有属性
                  ...product,
                  //覆盖旧属性
                  status: newStatus
                };
              }
              return product;
            })
          });
          message.success("更新商品状态成功");
        })
        .catch(err => {
          message.error(err);
        });
    };
  };
  /*   // 显示商品详情页面
  showProductDetail = product => {
    return () => {
      // 获取当前点击的商品id
      const id = product._id;
      // 跳转地址
      this.props.history.push('/product/' + id, product);
    };
  }; 
  //修改商品逻辑
  showUpdateProduct = product => {
    return () => {
      //高阶函数获取商品id
      //跳转地址
      this.props.history.push("/product/update/" + product._id, product);
    };
  };
 */
  // 封装上面两个点击跳转函数
  showProduct = (product, path = "") => {
    return () => {
      // 获取当前点击的商品id
      const id = product._id;
      // 跳转地址
      this.props.history.push("/product/" + path + id, product);
    };
  };

  //复用代码 发送请求
  getProductList = (pageNum, pageSize) => {
    this.setState({
      isLoading: true
    });
    const { currentSearchValue } = this; //定义成属性的Value
    const { searchType } = this.state; //定义成状态的Value
    //初始化promise 复用代码
    let promise = null;

    if (currentSearchValue) {
      promise = reqSearchProduct({
        pageNum,
        pageSize,
        searchValue: currentSearchValue, //明天记得再去看视频 为什么要用currentSearchValue
        searchType
      });
    } else {
      promise = reqGetProductList(pageNum, pageSize);
    }
    promise
      .then(response => {
        console.log(response);
        this.setState({
          productList: response.list,
          total: response.total,
          searchValue: currentSearchValue,
          //当前页数是多少就是多少
          current:pageNum
        });
        message.success(
          `${currentSearchValue ? "搜索" : "获取"}商品列表数据成功`
        );
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  //发送求情
  componentDidMount() {
    this.getProductList(1, 3);
  }
  //跳转显示添加商品分类
  showAddProduct = () => {
    //改变地址栏
    this.props.history.push("/product/add");
  };

  //收集Select数据
  handleSelect = value => {
    this.setState({
      searchType: value
    });
  };
  //收集Input数据
  handleInput = e => {
    this.setState({
      searchValue: e.target.value.trim()
    });
  };
  //点击搜索
  search = () => {
    const { searchValue } = this.state;

    this.currentSearchValue = searchValue;

    this.getProductList(1, 3);
  };

  render() {
    const {
      productList,
      total,
      isLoading,
      searchType,
      searchValue,
      current
    } = this.state;
    return (
      <Card
        title={
          <div>
            <Select defaultValue={searchType} onChange={this.handleSelect}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: 200, margin: "0 10px" }}
              onChange={this.handleInput}
              value={searchValue}
            />
            <Button type="primary" onClick={this.search}>
              搜索
            </Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddProduct}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={productList}
          bordered
          pagination={{
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            showSizeChanger: true,
            showQuickJumper: true,
            total,
            // 页码发生变化触发的函数
            onChange: this.getProductList,
            // pageSize 变化的回调
            onShowSizeChange: this.getProductList,
            current
          }}
          rowKey="_id"
          loading={isLoading}
        />
      </Card>
    );
  }
}
