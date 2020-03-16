
var qq=require("./index");


function search_test(){
    var out=qq.search("wq")
    console.log("\ninput:","wq","\nright:","你","\noutput:",out);
}


function translate_test(){
    var code="wq wu vb ka ";
    var right="你们好呀";
    console.log("\ninput:",code,"\nright:",right,"\noutput:",qq.translate(code));
}


search_test();
translate_test();
