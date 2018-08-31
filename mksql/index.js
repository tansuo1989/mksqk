const mysql=require("mysql");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

function wheresql(obj){
  var sql="";
	for(var i in obj){
    sql+=" "+mysql.escapeId(i)+"="+filter(obj[i])
    +" and";
    }
    if(!sql){return "";}
	sql=sql.substring(0,sql.length-4);
	return " where "+sql;
}

function filter(sql){
  sql=mysql.escape(sql);
  return sql;
}

exports.html_encode=function(str){
  return entities.encode(str);
}
exports.html_decode=function(str){
  return entities.decode(str);
}

exports.conn=function(config){
	var connection = mysql.createConnection(config);
	connection.connect();
	return connection;	
}

exports.insert=function(table,obj){
      var key="",value="";
      for(var i in obj){
      	key+=mysql.escapeId(i)+",";
      	value+=filter(obj[i])+",";
      }
      key=key.substring(0,key.length-1);
      value=value.substring(0,value.length-1);
      var sql='insert into '+mysql.escapeId(table)+" ("+key+") values ("+value+")";
      return sql;
	}

exports.select=function(table,fields,obj){
   var fields=fields?filter(fields):"*";
   var where=obj?wheresql(obj):"";
   var sql="select "+fields+" from "+mysql.escapeId(table)+where;
   return sql;
}

exports.where=wheresql;

exports.update=function(table,obj,where){
	if(!where){return false};

	var where=wheresql(where);

    var sql="update "+mysql.escapeId(table)+" set ";
	for(var i in obj){
		sql+=" "+mysql.escapeId(i)+"='"+filter(obj[i])+"' ,";
	}
	sql=sql.substring(0,sql.length-1);
	return sql+where;
}

exports.delete=function(table,where){
  if(!where){return false};
  return "delete from "+mysql.escapeId(table)+wheresql(where);
}

exports.bind=function(sql,obj){
  var str=sql;
  if(!obj){return str;}
  for(var i in obj){
    str=str.replace(":"+i,"\""+filter(obj[i])+"\"");
  }
  return str;
}