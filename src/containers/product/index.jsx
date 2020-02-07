import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";

import { reqGetProductList, reqSearchProduct } from "../../api";

export default class Product extends Component {
  state = {
    productList: [],
    total: 0,
    isLoading: false,
    searchType: "productName",
    searchValue: ""
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
      dataIndex: "price"
    },
    {
      title: "商品状态",
      dataIndex: "status",
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            <span>已下架</span>
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
            <Button type="link">详情</Button>
            <Button type="link" onClick={this.showUpdateProduct(product)}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];
  //修改商品逻辑
  showUpdateProduct = product => {
    return () => {
      //高阶函数获取商品id
      //跳转地址
      this.props.history.push("/product/update/" + product._id, product);
    };
  };

  getProductList = (pageNum, pageSize) => {
    this.setState({
      isLoading: true
    });
    const { currentSearchValue } = this;
    const { searchType } = this.state;
    let promise = null;

    if (currentSearchValue) {
      promise = reqSearchProduct({
        pageNum,
        pageSize,
        searchValue: currentSearchValue,
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
          searchValue:currentSearchValue
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
      searchValue
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
            onShowSizeChange: this.getProductList
          }}
          rowKey="_id"
          loading={isLoading}
        />
      </Card>
    );
  }
}
