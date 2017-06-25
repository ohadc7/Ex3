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
        public List<string> GetList()
        {
            return model.List();
        }


        [HttpGet]
        [Route("MultiPlayer/{mazeName}/{rows}/{cols}/{userName}")]
        public string Start(string mazeName, int rows, int cols, string userName)
        {
            var mpds = model.Start(mazeName, rows, cols, userName);
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
        [Route("MultiPlayer/{mazeName}/{userName}")]
        public string GetJoin(string mazeName, string userName)
        {
            MultiPlayerDS ds = model.Join(mazeName, userName);
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

        //return username of the loser player.
        [HttpGet]
        [Route("MultiPlayer/Iwon/{mazeName}/{myUserName}")]
        public string IamTheWinner(string mazeName, string myUserName)
        {
            model.updateWinnerOfGame(mazeName, myUserName);
            string startPlayer = model.GetMultiPlayerDataStructure(mazeName).usernameOfStartPlayer;
            string joinPlayer = model.GetMultiPlayerDataStructure(mazeName).usernameOfJoinPlayer;
            string loserPlayer = "";
            if (startPlayer == myUserName)
            {
                loserPlayer = joinPlayer;
            } else if (joinPlayer == myUserName)
            {
                loserPlayer = startPlayer;
            }
            return loserPlayer;
        }
        

    }
}
