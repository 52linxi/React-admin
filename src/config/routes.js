import Home from '../components/home'
import Category from '../containers/category'
import Product from '../containers/product'
import ProductForm from '../containers/product/product-form'
import ProductDeatil from '../containers/product/product-detail'

const routes =[
  {
    path:'/',
    component:Home,
    exact:true
  },
  {
    path:'/category',
    component:Category,
    exact:true
  },
  {
    path:'/product',
    component:Product,
    exact:true
  },
  {
    path:'/product/add',
    component:ProductForm,
    exact:true
  },
  {
    path:'/product/update/:id',
    component:ProductForm,
    exact:true
  },
  {
    path: '/product/:id',
    component:ProductDeatil,
    exact:true
  }


]

export default routes;