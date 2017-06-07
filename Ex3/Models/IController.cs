using System.Net.Sockets;
using Ex1.Model;

namespace Ex1.Controller
{
    internal interface IController
    {
        void ExecuteCommand(string commandLine, TcpClient client);
        void SetModel(IModel model);
    } 
}