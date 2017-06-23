// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="MultiPlayerDS.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Net.Sockets;
using MazeLib;
using Microsoft.AspNet.SignalR.Hubs;

//credit to the example from: https://msdn.microsoft.com/en-us/library/aa645739(v=vs.71).aspx

namespace Ex3A.Models
{
    public class MultiPlayerDS
    {
        /// <summary>
        /// Gets the name of game.
        /// </summary>
        /// <value>The name of game.</value>
        public string NameOfGame { get; }
        /// <summary>
        /// Gets or sets a value indicating whether [available to join].
        /// </summary>
        /// <value><c>true</c> if [available to join]; otherwise, <c>false</c>.</value>
        public bool AvailableToJoin { get; set; }
        /// <summary>
        /// Gets a value indicating whether this <see cref="MultiPlayerDS"/> is closed.
        /// </summary>
        /// <value><c>true</c> if closed; otherwise, <c>false</c>.</value>
        public bool Closed { get; private set; }
        
        public string usernameOfStartPlayer;

        public string usernameOfJoinPlayer;
        
        public Maze MazeInit;

        /// <summary>
        /// Initializes a new instance of the <see cref="MultiPlayerDS"/> class.
        /// </summary>
        /// <param name="hostClient">The host client.</param>
        /// <param name="nameOfGame">The name of game.</param>
        /// <param name="maze">The maze.</param>
        //public MultiPlayerDS(string ConnectionId, string nameOfGame, Maze maze)
        public MultiPlayerDS(string nameOfGame, Maze maze, string startPlayerUsername)
        {
            usernameOfStartPlayer = startPlayerUsername;
            NameOfGame = nameOfGame;
            usernameOfJoinPlayer = null;
            MazeInit = maze;
            AvailableToJoin = true;
            Closed = false;
        }
          
        /// <summary>
        /// Closes this instance.
        /// </summary>
        public void Close()
        {
            Closed = true;
        }
    }
}