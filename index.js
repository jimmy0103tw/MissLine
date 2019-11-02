var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId: "1557416590",
  channelSecret: "edf9605a7a0c4b7488c1a46d7ab080a4",
  channelAccessToken: "tAkfDq/up8OgpkbEV5/QINmy/n5ySr8IkD8k/dveGf96Ocgd9GfsvTYq6hAXkl3cX1Tolu9TM5/vJchfueNW2NObIO85cC9oRecv0T6arq0KZ51PAECyZZsRXpIeSL1bGBhsfQKw+ho8pyLYiAZu9wdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function(event) {
    console.log(event); //把收到訊息的 event 印出來看看
  });
  
  const app = express();
  const linebotParser = bot.parser();
  app.post('/', linebotParser);
  
  //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
  });