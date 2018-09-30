function get_argv(){
    return process.argv.splice(2);
 }
 function get_params(k){
     var param=get_argv();
     var re={};
     var len=param.length;
     for(var i=0;i<len;i++){
         if(param[i].substr(0,1)=="-"){
             re[param[i].substr(1)]=param[i+1];
         }
     }
     if(k){
         return re[k];
     }else{
         return re;
     }
 }
 exports.get_argv=get_argv;
 exports.get_params=get_params;