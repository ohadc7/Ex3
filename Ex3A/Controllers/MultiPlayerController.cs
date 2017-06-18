using Ex3A.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ex3A.Controllers
{
    public class MultiPlayerController : ApiController
    {
        private static IModel model = new Model();


        [HttpGet]
        [Route("MultiPlayer/{name}/{rows}/{cols}")]
        public string GetListGames(string name, int rows, int cols)
        {
            List <string> listOfGames = model.List();
            var jsonList = JsonConvert.SerializeObject(listOfGames);
            return jsonList;
        }

        [HttpGet]
        [Route("SinglePlayer/{name}/{algorithm}")]
        public string GetMazeSolution(string name, int algorithm)
        {
            return model.Solve(name, algorithm);
        }
    }
}
