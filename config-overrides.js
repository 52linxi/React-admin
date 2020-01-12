 const {
   override,
   fixBabelImports,
   addLessLoader,
   addDecoratorsLegacy,
   addWebpackExternals
 } = require('customize-cra');

 module.exports = override(
   //按需加载
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   //自定义主体
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: {
       '@primary-color': '#1DA57A'
     },
   }),
   //ES7 修饰器
   addDecoratorsLegacy(),
   //路劲别名
   addWebpackExternals({})
 );