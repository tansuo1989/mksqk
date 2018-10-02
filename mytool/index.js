#! node
// var argv=require("./lib/argv.js");
let fs=require("fs");

function is_dir(dir){
    if(is_link(dir)){
        return false;
    }
    var stat=fs.statSync(dir);
    return stat?stat.isDirectory():false;
}
function is_file(dir){
    if(is_link(dir)){
        return false;
    }
    var stat=fs.statSync(dir);
    return stat?stat.isFile():false;
}
function size(file){
    return fs.statSync(file).size;
}
function is_link(dir){
    return fs.lstatSync(dir).isSymbolicLink();
}
function log(str){
    console.log(str);
}
// var p=argv.get_params();
// console.log(p);

var dir=process.cwd();//执行程序的目录

function read_dir(dir){
    var all=[];
    function read(dir){
        fs.readdirSync(dir).forEach(v=>{
            var tem=dir+"/"+v;
            if(is_dir(tem)){
                read(tem);
            }else if(is_file(tem)){
                all.push({
                    file:tem,
                    size:size(tem),
                    name:v,
                });
            }
        })
    }
    read(dir);
    return all;
}

var get_same=(arr)=>{
    var same=[];
    var all={};
    arr.forEach(v=>{
       var key=v.name+v.size;
       if(all[key]){
           all[key].file.push(v.file);
       }else{
           all[key]={
               size:v.size,
               file:[v.file],
           }
       }
    })
    for(var i in all){
        if(all[i].file.length>1){
            same.push(all[i]);
        }
    }
    return same;
}


log("正在获取该目录下所有文件的信息");
var all=read_dir(dir);
console.log("共查找到"+all.length+"个文件");
all=get_same(all);
console.log("其中相同的文件共"+all.length+"个");
all.sort((a,b)=>{
    return parseInt(b.size)-parseInt(a.size);
})
log("排序完成，为你显示前10个结果：");
var top=all.splice(0,10);
top.forEach((v,i)=>{
    var size=v.size/1014;
    v.size=size>1014?((size/1024).toFixed(2)+" MB"):size.toFixed(2)+" KB";
    top[i]=v;
})
log(top);
log("完成");

