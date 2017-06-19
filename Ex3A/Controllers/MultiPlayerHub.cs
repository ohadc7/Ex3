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
        private class Game
        {
            //public string GameName;
            public string StartPlayer;
            public string JoinPlayer;
        }


        private static ConcurrentDictionary<string, Game> games = new ConcurrentDictionary<string, Game>();

        public void StartGame(string gameName)
        {
            Game g = new Game();
            //g.GameName = gameName;
            g.StartPlayer = Context.ConnectionId;
            g.JoinPlayer = null;
            games[gameName] = g;
        }

        public void JoinGame(string gameName)
        {
            if (games.ContainsKey(gameName) && games[gameName].JoinPlayer == null)
            {
                games[gameName].JoinPlayer = Context.ConnectionId;
                Clients.Client(games[gameName].StartPlayer).startPlaying();
                Clients.Client(games[gameName].JoinPlayer).startPlaying();
            }
        }
/*
        public void Move(string direction)
        {
            string recipientId = connectedUsers[recipientPhoneNum];
            if (recipientId == null)
                return;
            Clients.Client(recipientId).gotMessage(senderPhoneNum, text);
        }
*/



        /*
                private static ConcurrentDictionary<string, string> connectedUsers =
                    new ConcurrentDictionary<string, string>();

                public void SendMessage(string senderPhoneNum, string recipientPhoneNum, string text)
                {
                    string recipientId = connectedUsers[recipientPhoneNum];
                    if (recipientId == null)
                        return;
                    Clients.Client(recipientId).gotMessage(senderPhoneNum, text);
                }
        */
    }
}