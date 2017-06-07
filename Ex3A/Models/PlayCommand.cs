// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="PlayCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Net.Sockets;
using Ex1.Model;
using MazeLib;
 
namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class PlayCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class PlayCommand : ICommand
    { 
        /// <summary>
        /// The model
        /// </summary>
        private IModel model;
        /// <summary>
        /// The multi player ds
        /// </summary>
        private readonly MultiPlayerDS multiPlayerDS;

        /// <summary>
        /// Initializes a new instance of the <see cref="PlayCommand"/> class.
        /// </summary>
        /// <param name="multiPlayerDS">The multi player ds.</param>
        /// <param name="model">The model.</param>
        public PlayCommand(MultiPlayerDS multiPlayerDS, IModel model)
        {
            this.multiPlayerDS = multiPlayerDS;
            this.model = model;
            Name = this.multiPlayerDS.NameOfGame;
        }

        /// <summary>
        /// Gets the name.
        /// </summary>
        /// <value>The name.</value>
        private string Name { get; }
        /// <summary>
        /// Gets or sets the direction.
        /// </summary>
        /// <value>The direction.</value>
        private Direction Direction { get; set; }

        /// <summary>
        /// Executes the specified arguments.
        /// </summary>
        /// <param name="args">The arguments.</param>
        /// <param name="client">The client.</param>
        /// <returns>PacketStream.</returns>
        public PacketStream Execute(string[] args, TcpClient client)
        {
            //create new Direction with the parser of Direction
            Direction = this.DirectionParser(args[0]);
            //check who sent the direction, and change the parameter in the data structure
            if (multiPlayerDS.HostClient == client)
                multiPlayerDS.HostCurrentDirection = Direction;
            else
                multiPlayerDS.GuestCurrentDirection = Direction;

            return new PacketStream();
        }

        /// <summary>
        /// Parser from string to Direction
        /// </summary>
        /// <param name="direction">The direction.</param>
        /// <returns>Direction.</returns>
        public Direction DirectionParser(string direction)
        {
            switch (direction)
            {
                case "up":
                    return Direction.Up;
                case "down":
                    return Direction.Down;
                case "left":
                    return Direction.Left;
                case "right":
                    return Direction.Right;
            }
            return Direction;
        }
    }
}