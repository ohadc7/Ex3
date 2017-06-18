using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Ex3A.Models;
using System.Collections.Concurrent;

namespace Ex3A.Controllers
{
    public class MultiPlayerHub : Hub
    {

        private static ConcurrentDictionary<string, string> connectedUsers =
            new ConcurrentDictionary<string, string>();


        public void SendMessage(string senderPhoneNum, string recipientPhoneNum, string text)
        {
            string recipientId = connectedUsers[recipientPhoneNum];
            if (recipientId == null)
                return;
            Clients.Client(recipientId).gotMessage(senderPhoneNum, text);
        }
    }
}