using MazeGeneratorLib;
using MazeLib;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ex3A.Controllers
{
    public class GenerateController : ApiController
    {

            [HttpGet]
            [Route ("Generate/{name}/{rows}/{cols}")]
        public string GetGenerateMaze(string name, int rows, int cols)
        {
            var dfsMazeGenerator = new DFSMazeGenerator();
            Maze MyMaze = dfsMazeGenerator.Generate(rows, cols);
            MyMaze.Name = name;
            string s = MyMaze.ToJSON();
            return s;
        }

    }
}
