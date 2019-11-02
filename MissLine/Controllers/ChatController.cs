using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LineBot;
using System.Threading.Tasks;

namespace MissLine.Controllers
{
    public class ChatController : ApiController
    {
        [HttpPost]
        public string POST()
        {
            string ChannelAccessToken = "tAkfDq/up8OgpkbEV5/QINmy/n5ySr8IkD8k/dveGf96Ocgd9GfsvTYq6hAXkl3cX1Tolu9TM5/vJchfueNW2NObIO85cC9oRecv0T6arq0KZ51PAECyZZsRXpIeSL1bGBhsfQKw+ho8pyLYiAZu9wdB04t89/1O/w1cDnyilFU=";
            string test = "";


            try
            {
                //取得 http Post RawData(should be JSON)
                string postData = Request.Content.ReadAsStringAsync().Result;
                //剖析JSON
                var ReceivedMessage = isRock.LineBot.Utility.Parsing(postData);
                string userCommandString = ReceivedMessage.events[0].message.text;
                var bot = new isRock.LineBot.Bot(ChannelAccessToken);
                //回覆訊息
                string message = string.Empty;

                //字串為save表示紀錄 ※實際應用應該偷偷記錄User ID ，這邊是範例
                if (userCommandString == "save")
                {
                    //測試方法: 紀錄
                    //_service.InsertID(ReceivedMessage.events[0].source.userId);

                    test = bot.ReplyMessage(ReceivedMessage.events[0].replyToken,
                            string.Format("紀錄成功: {0}", ReceivedMessage.events[0].source.userId));

                    //回覆API
                    //var call = Task.Run(() =>
                    //{
                        //bot.ReplyMessage(ReceivedMessage.events[0].replyToken,
                            //string.Format("紀錄成功: {0}", ReceivedMessage.events[0].source.userId));
                    //});
                }
                return test;
            }
            catch (Exception ex)
            {
                string postData = Request.Content.ReadAsStringAsync().Result;
                //剖析JSON
                var ReceivedMessage = isRock.LineBot.Utility.Parsing(postData);
                var bot = new isRock.LineBot.Bot(ChannelAccessToken);

                return "ok";

               
            }
        }
    }
}
