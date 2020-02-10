import Home from '../components/home'
import Category from '../containers/category'
import Product from '../containers/product'
import ProductForm from '../containers/product/product-form'
import ProductDeatil from '../containers/product/product-detail'
import Bar from '../components/charts/bar'
import Map from '../components/charts/map'
import PIE from '../components/charts/pie'

const routes = [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/category',
    component: Category,
    exact: true
  },
  {
    path: '/product',
    component: Product,
    exact: true
  },
  {
    path: '/product/add',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/update/:id',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/:id',
    component: ProductDeatil,
    exact: true
  },
  {
    path: '/charts/bar',
    component: Bar,
    exact: true
  },
  {
    path: '/charts/line',
    component: Map,
    exact: true
  },
  {
    path: '/charts/pie',
    component: PIE,
    exact: true
  }



]

export default routes;