**demo

<pre>
var my=require("myask");
//使用一下
var ques=[
	{que:"吃饭了吗?"},
	{que:"几岁了？"},
	{que:"你好吗?"}
];

var fs=require("fs");

//使用范例：
//1.多个问题
// my.ask(ques).then(function(re){
// 	console.log(re);
// 	fs.writeFile("./a.txt",JSON.stringify(re),function(err,res){
// 		if(err){console.log(err);}else{
// 			console.log(res);
// 		}
// 	})
// })
//2.单个问题
// my.ask("哈哈，你在哪里？").then(function(d){
// 	console.log(d);
// })

//3.也可以使用async/await 
async function test(){
	var re=await my.ask(ques);
	console.log(re);
}
test();

</pre>