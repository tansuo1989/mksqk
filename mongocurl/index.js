var mongo=require('mongodb').MongoClient;

function mymongo(config){

this.config=config?config:'mongodb://localhost:27017/test';
var _this=this;
this.table=function(col){
	return new Promise(function(fn,efn){
		mongo.connect(_this.config,function(err,db){
			if(err){console.log("连接失败");efn(err);return;}
			fn(db.collection(col));
		})
	})
}

this.find=function(data){
	return new Promise(function(fn,efn){
		_this.table(data.table).then(function(db){
		 db.find(data.where).toArray(function(err,res){
			if(err){
				efn(err);
			}else{
				fn(res);
			}
			//db.close();
		})	
		})
	})
}

this.insert=function(data){
	return new Promise(function(fn,efn){
		_this.table(data.table).then(function(db){
		 db.insert(data.data,function(err,res){
			if(err){
				efn(err);
			}else{
				fn(res);
			}
			//db.close();
		})	
		})
	})
}

this.save=function(data){
	return new Promise(function(fn,efn){
		_this.table(data.table).then(function(db){
		 db.save(data.data,function(err,res){
			if(err){
				efn(err);
			}else{
				fn(res.result);
			}
			//db.close();
		})	
		})
	})
}

this.update=function(data){
	return new Promise(function(fn,efn){
		_this.table(data.table).then(function(db){
		 db.update(data.where,{'$set':data.data},{multi:data.all},function(err,res){
			if(err){
				efn(err);
			}else{
				fn(res.result);
			}
			//db.close();
		})	
		})
	})
}

this.remove=function(data){
	return new Promise(function(fn,efn){
		_this.table(data.table).then(function(db){
		 if(!data.where){console.log("where条件不存在");return;}	
		 db.remove(data.where,{justOne:data.justOne},function(err,res){
			if(err){
				efn(err);
			}else{
				fn(res.result);
			}
			//db.close();
		})	
		})
	})
}

}


module.exports.mongocurl=mymongo;
module.exports.client=mongo;