// var async = require('asyncawait/async');
// var await = require('asyncawait/await');

function ask(que){
	return new Promise(function(fn,efn){
		process.stdout.write(que);
	    process.stdin.on('data', function (chunk) {
	     fn(chunk.toString().replace(/\r|\n/g,""));
	   });
	})
}

// var myask=async(function(re){
// 	if(Array.isArray(re)){
// 		for(var i=0;i<re.length;i++){
// 		re[i]['ans']=await(ask(re[i]['que']));
// 	  }
// 	}else{
// 		var ii=await(ask(re));
// 		var re={que:re,ans:ii};
// 	}
// 	return re;
// })
//更新，使用node内置的async/await，不再需要第三方库了

async function myask(re){
	if(Array.isArray(re)){
		for(var i=0;i<re.length;i++){
		re[i]['ans']=await ask(re[i]['que']);
	  }
	}else{
		var ii=await(ask(re));
		var re={que:re,ans:ii};
	}
	return re;
}

exports.ask=myask;