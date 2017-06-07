// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="ListCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Net.Sockets;
using System.Text; 
using Ex1.Model;
using Newtonsoft.Json.Linq;
 
namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class ListCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class ListCommand : ICommand
    {
        /// <summary>
        /// The model
        /// </summary>
        private readonly IModel model;

        /// <summary>
        /// Initializes a new instance of the <see cref="ListCommand"/> class.
        /// </summary>
        /// <param name="model">The model.</param>
        public ListCommand(IModel model)
        {
            this.model = model;
        }

        /// <summary>
        /// Executes the specified arguments.
        /// </summary>
        /// <param name="args">The arguments.</param>
        /// <param name="client">The client.</param>
        /// <returns>PacketStream.</returns>
        public PacketStream Execute(string[] args, TcpClient client)
        {
            //gets the list of multi player games that available to join
            var listOfGames = model.list();
            JArray j = new JArray();
            foreach (var name in listOfGames)
            {
                j.Add(name);
            }

            var ListPacketStream = new PacketStream
            {
                StringStream = j.ToString()
            };
            return ListPacketStream;
        }
    }
}