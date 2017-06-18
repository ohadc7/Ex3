using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Ex3A.Controllers
{
    public class MultiPlayerHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}