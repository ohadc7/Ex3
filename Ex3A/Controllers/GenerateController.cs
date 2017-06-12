using MazeGeneratorLib;
using MazeLib;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Ex3A.Models;

namespace Ex3A.Controllers
{
    public class GenerateController : ApiController
    {
        private static IModel model;
        public GenerateController()
        {
            model = new Model();
        }
            
        [HttpGet]
        [Route ("Generate/{name}/{rows}/{cols}")]
        public string GetGenerateMaze(string name, int rows, int cols)
        {
            Maze maze= model.generate(name, rows, cols);
            return (string)maze.ToJSON();
        }


        // GET: api/Generator
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Generator/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Generator
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Generator/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Generator/5
        public void Delete(int id)
        {
        }


    }
}
