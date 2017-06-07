// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="StartCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Net.Sockets;
using Ex1.Model;

namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class StartCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class StartCommand : ICommand
    {
        /// <summary>
        /// The model
        /// </summary>
        private readonly IModel model;

        /// <summary>
        /// Initializes a new instance of the <see cref="StartCommand"/> class.
        /// </summary>
        /// <param name="model">The model.</param>
        public StartCommand(IModel model)
        {
            this.model = model;
        }
         
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        private string Name { get; set; }

        /// <summary>
        /// Executes the specified arguments.
        /// </summary>
        /// <param name="args">The arguments.</param>
        /// <param name="client">The client.</param>
        /// <returns>PacketStream.</returns>
        public PacketStream Execute(string[] args, TcpClient client)
        { 
            Name = args[0];
            var rows = int.Parse(args[1]);
            var cols = int.Parse(args[2]);

            //gets a new Data Structure to hold the info of a multi player game
            var mpStart = model.start(Name, rows, cols, client);

            var startPacketStream = new PacketStream
            {
                MultiPlayer = true,
                MultiPlayerDs = mpStart,
                StringStream = ""
            };

            //create the controller to run the multi player game from the host side
            var mpgStart = new MultiPlayerGameController(mpStart, true);
            mpgStart.SetModel(model);
            //initialize the game controller
            mpgStart.Initialize();
            mpgStart.ManageCommunication();
            return startPacketStream;
        }
    }
}