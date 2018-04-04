var mysql=require("mysql");


function wheresql(obj){
  var sql="";
	for(var i in obj){
    sql+=" "+i+"='"+filter(obj[i])
    +"' and";
    }
    if(!sql){return "";}
	sql=sql.substring(0,sql.length-4);
	return " where "+sql;
}

function filter(sql){
  return mysql.escape(sql);
}

exports.filter=filter;

exports.conn=function(config){
	var connection = mysql.createConnection(config);
	connection.connect();
	return connection;	
}

exports.insert=function(table,obj){
      var sql="insert into "+table+" ";
      var key="",value="";
      for(var i in obj){
      	key+=filter(i)+",";
      	value+="'"+filter(obj[i])+"',";
      }
      key=key.substring(0,key.length-1);
      value=value.substring(0,value.length-1);
      var sql='INSERT INTO '+filter(table)+" ("+key+") VALUES ("+value+")";
      return sql;
	}

exports.select=function(table,fields,obj){
   var fields=fields?filter(fields):"*";
   var where=obj?wheresql(obj):"";
   var sql="select "+fields+" from "+table+where;
   return sql;
}

exports.where=wheresql;

exports.update=function(table,obj,where){
	if(!where){return false};

	var where=wheresql(where);

    var sql="update "+filter(table)+" set ";
	for(var i in obj){
		sql+=" "+filter(i)+"='"+filter(obj[i])+"' ,";
	}
	sql=sql.substring(0,sql.length-1);
	return sql+where;
}

exports.delete=function(table,where){
  if(!where){return false};
  return "delete from "+filter(table)+wheresql(where);
}

exports.bind=function(sql,obj){
  var str=sql;
  if(!obj){return str;}
  for(var i in obj){
    str=str.replace(":"+i,"\""+filter(obj[i])+"\"");
  }
  return str;
}