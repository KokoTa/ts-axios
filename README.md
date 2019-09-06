# 需求

1. 基础功能
   1. 处理请求 url
   2. 处理请求 body
   3. 处理请求 header
   4. 获取响应数据
   5. 处理响应 header
   6. 处理响应 data
2. 异常处理
   1. 错误处理
   2. 错误信息增强
3. 接口扩展
   1. 扩展接口(多种方式调用 axios)
   2. 响应数据支持泛型
4. 拦截器(interceptor)
5. 配置合并
   1. default：默认配置
   2. transform：转换数据
   3. create：新建实例
6. 其他功能
   1. 取消功能(cancel)：debounce 并不能完全解决多次发送请求的问题，因为如果接口过慢，则会造成响应顺序不一致，响应互相覆盖的问题。因此需要实现取消功能，新发送请求时，取消为响应请求
   2. credentials：跨域带 cookie
   3. xsrf：请求带 token
   4. download/upload progress：下载/上传监控
   5. authorization：授权
   6. 自定义合法状态码
   7. 自定义参数序列化
   8. axios.all/axios.spread/axios.getUri
