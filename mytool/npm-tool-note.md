## npm 命令行工具的开发
可以参考[这里](https://segmentfault.com/a/1190000016555129)

1. 脚本 index.js 第一行注意加入：
#! node
linux 中加入：
#!/usr/bin/env node
index.js中写入简单的代码：
```javascript
  console.log("I am aa");
```
如果不加第一委，运行后可能会出现 console未定义的情况，因为没有指定nodejs的运行环境

2. package.json 中的字段：
```json
{
  "name": "aa", //名称必须
  "version": "1.0.0",
  "description": "l",
  "main": "index.js",
  "bin": {
    "aa": "index.js" //前面的aa 即全局命令，可以随便改
  },
//   "bin":"index.js",//这样写的话，命令的名字就是name对应的aa
}


```
3.把本地npm包作为全局安装来使用：
```sh
npm link #在项目目录下执行
#或
npm i . -g

aa #即可看到  I am aa
```
其它工作就是在index.js中写代码了:

4. 获取命令行参数：
可以用 minimist 包:cnpm i minimist --save

5. 

