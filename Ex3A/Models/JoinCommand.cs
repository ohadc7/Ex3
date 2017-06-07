// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="JoinCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Net.Sockets;
using Ex1.Model;
 
namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class JoinCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class JoinCommand : ICommand
    {
        /// <summary>
        /// The model
        /// </summary>
        private readonly IModel model;

        /// <summary>
        /// Initializes a new instance of the <see cref="JoinCommand"/> class.
        /// </summary>
        /// <param name="model">The model.</param>
        public JoinCommand(IModel model)
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
            var joinPacketStream = new PacketStream
            {
                MultiPlayer = true,
                StringStream = ""
            };

            var name = args[0];
            MultiPlayerDS mpJoin;
            try
            {
                //gets the multi player data structure that holds the info for the multi player game
                mpJoin = model.GetMultiPlayerDataStructure(name);
                //attach the guest client to the class structure
                mpJoin.GuestClient = client;
                //set the game to be full and no other clients can join
                mpJoin.AvailableToJoin = false;

                //create the controller to run the game from the guest side
                var mpgJoin = new MultiPlayerGameController(mpJoin, false);
                mpgJoin.SetModel(model);
                mpgJoin.Initialize();
                mpgJoin.ManageCommunication();
            } 
            catch
            {
                Console.WriteLine("the name of game to join isn't exist");
            }

            return joinPacketStream;
        }
    }
}