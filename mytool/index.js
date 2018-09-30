#! node
// var argv=require("./lib/argv.js");
let fs=require("fs");

function is_dir(dir){
    var stat=fs.statSync(dir);
    return stat?stat.isDirectory():false;
}
function is_file(dir){
    var stat=fs.statSync(dir);
    return stat?stat.isFile():false;
}
function size(file){
    return fs.statSync(file).size;
}
// var p=argv.get_params();
// console.log(p);

var dir=process.cwd();//执行程序的目录

function read_dir(dir){
    var all=[];
    function read(dir){
        fs.readdirSync(dir).forEach(v=>{
            var tem=dir+"/"+v;
            console.log(tem)
            if(is_dir(tem)){
                read(tem);
            }else if(is_file(tem)){
                all.push({
                    file:tem,
                    size:size(tem),
                });
            }
        })
    }
    read(dir);
    return all;
}

var all=read_dir(dir);
all.sort((a,b)=>{
    return parseInt(b.size)-parseInt(a.size);
})
var ten=all.splice(0,10);
ten.forEach((v,i)=>{
    var size=v.size/1014;
    v.size=size>1014?((size/1024).toFixed(2)+" MB"):size.toFixed(2)+" KB";
    ten[i]=v;
})
console.log(ten);

