
var arr=require("./qq_wubi_data.js").qqwb;

var search=(code)=>{
    var reg=code.match(/\d{1}$/)
    if(reg){
        var i=reg[0];
        var key=code.replace(i,"");
    }else{
        var key=code;
        var i=1;
    }
    if(key in arr){
        return arr[key][i-1];
    }
    return code;
}

exports.search=search;


exports.translate=(str)=>{
    var old_data=str.split(" ");
    var out="";
    //空格没有处理
    old_data.forEach(v=>{
        let arr=v.match(/[a-y]{1,4}\d?/g); 
        if(arr){
            arr.forEach(vv=>{
                v=v.replace(vv,search(vv));
            })
        }
        out+=v; 
    })
    return out;
}
