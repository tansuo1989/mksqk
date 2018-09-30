
<blockquote>
var mongo=require("./index");

//or: var mongo=require("mongocurl");

//var db=new mongo.mymongo("mongodb://localhost:27017/haha");

var db=new mongo.mymongo();


// db.find({where:{name:"gg"},table:"test"}).then(function(d){

// 	console.log(d);

// })

// db.insert({

// 	table:"test",

// 	data:{

// 		name:"yy",

// 		age:parseInt(Math.random()*100)

// 	}

// }).then(function(d){

// 	console.log(d);

// }).catch(function(e){

// 	console.log(e);

// })

// db.update({

// 	table:"test2",

// 	where:{

// 		name:"yy",

// 	},
// 	data:{

// 		age:19

// 	},

// 	all:true,

// }).then(function(d){

// 	console.log(d);

// })

// db.remove({

// 	table:"test",

// }).then(function(d){

// 	console.log(d);

// })
db.save({

	table:"test",

	data:{

		name:"save",

		age:parseInt(Math.random()*100),

		money:parseInt(Math.random()*100)

	}

}).then(function(d){

	console.log(d);

})

db.find({table:"test"}).then(function(d){

	console.log(d);
	
})
</blockquote>