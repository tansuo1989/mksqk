# 使用方法
1. 引入mksql
``` javascript
    var mk=require("mksql");
``` 
2. 连接数据库：
``` javascript
    var config={
        host     : 'localhost',
        port     :  3307,
        user     : 'root',
        password : '',
        database : 'test'
    }
    //建议配置信息从配置文件读取

    var conn=mk.conn(config);
```
3. 生成 sql 语句
``` javascript
    var sql=mk.select("tablename","id,name",{id:3});

    var sql=mk.insert("tablename",{name:"lilei",age:20});

    var sql=mk.update("table",data,where);

    var sql=mk.delete("table",where);

    var sql=mk.bind("select * from table where id=:id and name=:name",{id:3,name:"lilei"});

```
4. 直接使用conn.query 方法：
``` javascript
    conn.query(sql,function(err,res){
        console.log(err,res);
    })
```
# todo:
 * delete 和 update 的时候，当 where 条件不成立时，考虑报错
