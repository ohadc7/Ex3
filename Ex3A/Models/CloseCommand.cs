// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="CloseCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Net.Sockets;
using System.Threading;
using Ex1.Model;
 
namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class CloseCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class CloseCommand : ICommand
    {
        /// <summary>
        /// The model
        /// </summary>
        private IModel model;
        /// <summary>
        /// The multi player Data Structure
        /// </summary>
        private readonly MultiPlayerDS multiPlayerDS;
         
        /// <summary>
        /// Initializes a new instance of the <see cref="CloseCommand"/> class.
        /// </summary>
        /// <param name="multiPlayerDS">The multi player ds.</param>
        /// <param name="model">The model.</param>
        public CloseCommand(MultiPlayerDS multiPlayerDS, IModel model)
        {
            this.multiPlayerDS = multiPlayerDS;
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
            multiPlayerDS.Close();
            Thread.Sleep(300);

            var closePacketStream = new PacketStream
            {
                MultiPlayer = false,
                StringStream = ""
            };
            return closePacketStream;
        }
    }
}