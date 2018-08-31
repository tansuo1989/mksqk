var myrequest=require("./index.js");


var options={
    host:"http://www.baidu.com",
}

myrequest.request(options,(err,res)=>{
   if(err){
       console.log("err:",err);
   }else{
       console.log(res.body)
   }
})