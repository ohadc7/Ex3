using Ex3A.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Ex3A.Controllers
{
    public class MultiPlayerController : ApiController
    {

        private static IModel model = new Model();

        [HttpGet]
        [Route("MultiPlayer")]
        public List<string> getList()
        {
            return model.List();
        }


        [HttpGet]
        [Route("MultiPlayer/{name}/{rows}/{cols}/{id}")]
        public string Start(string name, int rows, int cols, string id)
        {
            return model.Start(name, rows, cols, id).MazeInit.ToJSON();
        }

        [HttpGet]
        [Route("MultiPlayer/{name}/{id}")]
        public void getJoin(string name, string id)
        {
            MultiPlayerDS ds = model.Join(name, id);

        }

        [HttpGet]
        [Route("MultiPlayer/{move}")]
        public void Play(string move)
        {

        }

        public void Close()
        {

        }


    }
}
