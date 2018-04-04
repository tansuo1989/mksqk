var mksql=require("./index");


var test={
   test_html:function(){
       var str="<div>'hello world!'<script>alert(33)/</script></div>";
       if(mksql.html_decode(mksql.html_encode(str))!=str){
           console.log("error:html_encode,html_decode");
       }else{
           console.log("succ:html_enocde,html_decode")
       }
   },
   insert:function(){
       var sql=mksql.insert("mytable",{name:"haha",age:9});
       console.log(sql);
   },
   select:function(){
       var sql=mksql.select("mytable","id,name",{id:5});
       console.log(sql);
   },
   update:function(){
       var sql=mksql.update("table",{id:6},{name:"hi"});
       console.log(sql);
   },
   delete:function(){
       var sql=mksql.delete("table",{id:8});
       console.log(sql);
   },
   bind:function(){
       var sql=mksql.bind("select*from table where id=:id and age>:age",{id:5,age:30});
       console.log(sql);
   }
}








for(var i in test){
    test[i]();
}