// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="GenerateMazeCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Net.Sockets;
using Ex1.Model;
 
namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class GenerateMazeCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class GenerateMazeCommand : ICommand
    {
        /// <summary>
        /// The model
        /// </summary>
        private readonly IModel model;

        /// <summary>
        /// Initializes a new instance of the <see cref="GenerateMazeCommand"/> class.
        /// </summary>
        /// <param name="model">The model.</param>
        public GenerateMazeCommand(IModel model)
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
            var name = args[0];
            var rows = int.Parse(args[1]);
            var cols = int.Parse(args[2]);
            //generate maze with the parameters of name, row and cols
            var maze = model.generate(name, rows, cols);
            var generatePacketStream = new PacketStream
            {
                StringStream = maze.ToJSON()
            };
            return generatePacketStream;
        }
    }
}