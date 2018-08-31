const http = require("http");
const querystring = require('querystring');


exports.request=(config,fn)=>{
    const postData="";
    if(typeof config=="string"){
        var options={
            hostname:config,
            port:80,
            method:"GET"
        }
    }else{
        if(config.data){
            postData = querystring.stringify(config.data);
            delete config.data;
        }
        var options=config;
    }
    options=parse_config(options);
  
    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        var data="";
        res.on('data', (chunk) => {
            data+=chunk;
        });
        res.on('end', () => {
            res.body=data;
            fn&&fn(false,res);
        });
    });
    
    req.on('error', (e) => {
          fn&&fn(e,"");
    });
    // 写入数据到请求主体
    req.write(postData);
    req.end();
}

var parse_config=(options)=>{
    var url=options.hostname?options.hostname:options.host;
    if(url.search("http://")==0){
        url=url.substr(7);
        var protocol="http:";
    }else if(url.search("https://")==0){
        url=url.substr(8);
        var protocol="https:";
    }
    //protocol
    options.protocol=options.protocol?options.protocol:protocol;

    var index=url.search("/");
    if(index>0){
        var hostname=url.substr(0,index);
        var path=url.substr(index);
    }else{
        var hostname=url;
        var path="";
    }
    //hostname
    options.hostname=options.host=hostname;

    var port=path.match(/:\d+$/);
    //port path
    options.port=options.port?options.port:(port?port[0].substr(1):80);
    options.path=options.path?options.path:(path.replace(":"+options.port,""));
 
    return options;
}