import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal,message } from "antd";
import { connect } from "react-redux";
import { getCategoryListAsync,addCategoryAsync } from "../../redux/action";
import AddCategoryForm from "./add-category-from";

@connect(state => ({ categories: state.categories }), { getCategoryListAsync,addCategoryAsync })
class Category extends Component {
  //定义状态对话框
  state = {
    isShowAddCategory: false
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
      dataIndex: "operation",
      render() {
        return (
          <div>
            <Button type="link">修改分类</Button>
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
    const { validateFields,resetFields } = this.addCategoryForm.props.form;

    validateFields((err,values)=>{
      if (!err) {
        const {categoryName} = values

        this.props.addCategoryAsync(categoryName)
          .then(()=>{
            //提示成功
            message.success('添加分类成功')
            //清空数据
            resetFields()
            //隐藏对话框
            this.hiddenAddCategory()
          })
          .catch(()=>{
            message.error(err)
          })
        
      }
    })
  };
  //隐藏对话框
  hiddenAddCategory = () => {
    this.setState({
      isShowAddCategory: false
    });
  };
  //显示对话框
  showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    });
  };

  render() {
    const { categories } = this.props;
    const { isShowAddCategory } = this.state;

    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.showAddCategory}>
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
            title=" 添加分类"
            visible={isShowAddCategory}
            onOk={this.addCategory}
            onCancel={this.hiddenAddCategory}
            width={300}
          >
            <AddCategoryForm wrappedComponentRef={(form) => (this.addCategoryForm = form)} />
          </Modal>
        </Card>
      </div>
    );
  }
}

export default Category;
