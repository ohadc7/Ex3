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
        [Route("MultiPlayer/{name}/{rows}/{cols}")]
        public string Start(string name, int rows, int cols)
        {
            var mpds = model.Start(name, rows, cols);
            if (mpds != null)
            {
                return mpds.MazeInit.ToJSON();
            }
            else
            {
                //this name isn't available because there is already maze with this name
                return "not available";
            }
        }

        [HttpGet]
        [Route("MultiPlayer/{name}")]
        public string getJoin(string name)
        {
            MultiPlayerDS ds = model.Join(name);
            if (ds != null)
            {
                return ds.MazeInit.ToJSON();
            } else
            {
                return "not available";
            }
        }

        public void Close()
        {

        }


    }
}
