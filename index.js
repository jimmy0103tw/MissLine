var linebot = require('linebot');
var express = require('express');



var bot = linebot({
  channelId: "1557416590",
  channelSecret: "edf9605a7a0c4b7488c1a46d7ab080a4",
  channelAccessToken: "tAkfDq/up8OgpkbEV5/QINmy/n5ySr8IkD8k/dveGf96Ocgd9GfsvTYq6hAXkl3cX1Tolu9TM5/vJchfueNW2NObIO85cC9oRecv0T6arq0KZ51PAECyZZsRXpIeSL1bGBhsfQKw+ho8pyLYiAZu9wdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  if(event.message.text == "save"){
    var app=express();
    app.get('/',function(req,res){
      var sql=require('mssql');
     //config for your database
      var config={
         user:'sa',
         password:'Jj0933832529',
         server:'114.34.163.53\MSMS,1433',   //這邊要注意一下!!
         database:'missDB'
      };
      
     //connect to your database
      sql.connect(config,function (err) {
        if(err) console.log(err);
      
     //create Request object
        var request=new sql.Request();
        request.query("update EmployeeV2Tbl SET Renark ='"+event.source.userId+"' where EmployeeID = 'MT-108007' and status = 1;",function(err,recordset){
        if(err) console.log(err);
        res.send(recordset);
        //
          event.reply("OK").then(function (data) {
          // 當訊息成功回傳後的處理
          }).catch(function (error) {
          // 當訊息回傳失敗後的處理
          });
        });
      });
      
     });

  }
  
});
  
  const app = express();
  const linebotParser = bot.parser();
  app.post('/', linebotParser);
  
  //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });