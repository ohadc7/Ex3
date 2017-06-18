using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Ex3A.Models;

namespace Ex3A.Controllers
{
    public class MultiPlayerHub : Hub
    {
        private static IModel model = new Model();


        public List<string> List()
        {
            return model.List();
        }
        public void Start(string name, int rows, int cols)
        {
            MultiPlayerDS ds = model.Start(name, rows, cols, Context.ConnectionId);
        }
        public void Join(string name)
        {
            MultiPlayerDS ds = model.Join(name, Context.ConnectionId);

        }

        public void Play(string move)
        {

        }
        public void Close()
        {

        }




    }
}