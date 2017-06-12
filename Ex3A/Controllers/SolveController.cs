using Ex3A.Models;
using SearchAlgorithmsLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ex3A.Controllers
{
    
    public class SolveController : ApiController
    {
        private static IModel model;
        public SolveController()
        {
            model = new Model();
        }

        [HttpGet]
        [Route("Solve/{name}/{algorithm}")]
        public string GetMazeSolution(string name, int algorithm)
        {
           Solution solution = model.solve(name, algorithm);
           return solution.ToString();
        }
    }
    
}
