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
        /*
         private static List<Maze> mazesList = new List<Maze> {
             //new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
             //new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
             //new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M }
         };
         */
        /*  public IEnumerable<Product> GetAllProducts()
          {
              return products;
          }*/

        public string GetGenerateMaze(string name, int rows, int cols)
        {
            var dfsMazeGenerator = new DFSMazeGenerator();
            Maze MyMaze = dfsMazeGenerator.Generate(rows, cols);
            MyMaze.Name = name;
            string s = MyMaze.ToJSON();
            return s;
        }

        public string Get(int id)
        {
            return "value";
        }

        /*[HttpPost]
        public void AddProduct(Product p)
        {
            products.Add(p);
        }*/
    }
}
