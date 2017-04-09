function transfer(text){
    var t = text.replace(/[\r\n|\n]/g, '');
    return t.match(/<a\s+href="\/offerdetail\/.*?<\/a>/g);    
}
function parse(text){
    var list = transfer(text),
    objls = [],
    temp = [],
    desc = [];
    try{
        objls = list.map((v, i)=>{
            temp = v.match(/<a href="(.*?)" data-ajax= "false" >(.*?)<span class="ui-li-count">(.*?)<\/span>/);
            desc = temp[2].trim().split(/\s+/);
            return {'link':temp[1],'corp':desc[0],'location':desc[1],'position':desc[2],'time':temp[3]};
        })

    }
    catch(e){
        console.log(e);
    }
    return objls;
}

function analyzeDetail(text){
    //remove newlines
    var t = text.replace(/[\r\n|\n]/g,'');
    //match useful infomations
    var matchls = t.match(/<div class="ui-block-b">.*?<\/div>/g);
    //remove html tags
    try{
        matchls = matchls.map((v, i)=>{
            return v.replace(/<.*?>/g,'');
        });
    }
    catch(e){
        console.log(e);
    }

    return matchls;
}

module.exports.parse = parse;
module.exports.analyzeDetail = analyzeDetail;
