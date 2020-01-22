import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal, message } from "antd";
import { connect } from "react-redux";
import {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync
} from "../../redux/action";
import AddCategoryForm from "./add-category-from";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync
})
class Category extends Component {
  //定义状态对话框
  state = {
    isShowCategoryModel: false,
    //isUpdateCategory: false,
    category: {}
  };
  //请求数据展示
  componentDidMount() {
    this.props.getCategoryListAsync();
  }
  //表跟列
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      //dataIndex: "_id",
      render: category => {
        return (
          <div>
            <Button type="link" onClick={this.showCategoryModel(category)}>
              修改分类
            </Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];
  //1.校验表单 2.获取数据 3.发送请求 4.更新数据
  addCategory = () => {
    console.log(this.addCategoryForm.props.form);
    //获取方法  this.addCategoryForm.props.form通过wrappedComponentRef传Form方法
    const { validateFields, resetFields } = this.addCategoryForm.props.form;
    const {
      category: { name, _id }
    } = this.state;

    validateFields((err, values) => {
      if (!err) {
      
        const { categoryName } = values;
        //定义个初始值
        let promise = null;
        //根据name的值来判断添加还是修改 有就是修改 没有就是添加
        if (name) {
          promise = this.props.updateCategoryAsync(_id, categoryName);
        } else {
          promise = this.props.addCategoryAsync(categoryName);
        }
        //复用代码
        promise
          .then(() => {
            //提示成功
            message.success(`${name?'修改':'添加'}分类成功`);
            //清空数据
            resetFields();
            //隐藏对话框
            this.hiddenAddCategory();
          })
          .catch(() => {
            message.error(err);
          });
      }
    });
  };
  //隐藏对话框
  hiddenAddCategory = () => {
    this.setState({
      isShowCategoryModel: false
    });
  };
  //显示对话框
  showCategoryModel = (category = {}) => {
    return () => {
      this.setState({
        isShowCategoryModel: true,
        category
        //isUpdateCategory: category.name
      });
    };
  };

  /*  //修改分类的逻辑
  showAddCategoryModel = () => {
    return () => {
      //更新状态
      this.setState({
        isUpdateCategory: false,
        category:{}
      });
      //显示对话框
      this.showCategoryModel();
    };
  };

  //修改分类的逻辑
  showUpdateCategoryModel = category => {
    return () => {
      //更新状态
      this.setState({
        isUpdateCategory: true,
        category
      });
      //显示对话框
      this.showCategoryModel();
    };
  }; */

  render() {
    const { categories } = this.props;
    const { isShowCategoryModel, category } = this.state;

    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.showCategoryModel()}>
              <Icon type="plus" />
              分类列表
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            pagination={{
              defaultPageSize: 3,
              pageSizeOptions: ["3", "6", "9", "12"],
              showQuickJumper: true,
              showSizeChanger: true
            }}
            rowKey="_id"
          />
          <Modal
            title={category.name ? "修改分类" : "添加分类"}
            visible={isShowCategoryModel}
            onOk={this.addCategory}
            onCancel={this.hiddenAddCategory}
            width={300}
          >
            <AddCategoryForm
              categoryName={category.name}
              wrappedComponentRef={form => (this.addCategoryForm = form)}
            />
          </Modal>
        </Card>
      </div>
    );
  }
}

export default Category;
