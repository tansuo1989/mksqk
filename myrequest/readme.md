## myrequest

当我看到 request包那么多依赖的时候，我发现其实我一般只是使用一些简单的http请求，没有使用原生的http是因为写起来比较复杂。
所以，在这里作个简单的封装。


## 使用方法很简单：
1. 请求参数见：http://nodejs.cn/api/http.html#http_http_request_options_callback
   做了一些容错处理。

2. 回调参数：
```
 err 错误
 res 返回体
 res.body 返回的内容
```


## 兼容性：
1. 使用了箭头函数，要求nodejs 版本大于 6.0

## todo
1. proxy 功能
