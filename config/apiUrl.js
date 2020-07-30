let ipUrl = 'http://www.jswei.top:7001/default/'

let servicePath = {
  getArticleList: ipUrl + 'getArticleList',  //  首页文章列表接口
  getArticleById: ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
  getTypeInfo: ipUrl + 'getTypeInfo',//文章类别接口
  getListById: ipUrl + 'getListById/'//根据类别id获得文章列表
}
export default servicePath;