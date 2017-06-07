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

//credit to the example from: https://msdn.microsoft.com/en-us/library/aa645739(v=vs.71).aspx

namespace Ex1.Model
{
    // A delegate type for hooking up change notifications.
    /// <summary>
    /// Delegate ChangedEventHandler
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
    public delegate void ChangedEventHandler(object sender, EventArgs e);
    /// <summary>
    /// Delegate ClienetPlayedEventHandler
    /// </summary>
    /// <param name="direction">The direction.</param>
    public delegate void ClienetPlayedEventHandler(Direction direction);
    /// <summary>
    /// Class MultiPlayerDS.
    /// </summary>
    internal class MultiPlayerDS
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
        /// <summary>
        /// Gets the host client.
        /// </summary>
        /// <value>The host client.</value>
        public TcpClient HostClient { get; }
        /// <summary>
        /// Gets or sets the guest client.
        /// </summary>
        /// <value>The guest client.</value>
        public TcpClient GuestClient { get; set; }
        /// <summary>
        /// The maze initialize
        /// </summary>
        public Maze MazeInit;
        /// <summary>
        /// The guest current direction
        /// </summary>
        private Direction guestCurrentDirection;
        /// <summary>
        /// The host current direction
        /// </summary>
        private Direction hostCurrentDirection;

        /// <summary>
        /// Gets or sets the host current direction.
        /// </summary>
        /// <value>The host current direction.</value>
        public Direction HostCurrentDirection
        {
            get { return hostCurrentDirection; }
            set
            {
                hostCurrentDirection = value;
                HostPlayActionOccurd?.Invoke(hostCurrentDirection);
            }
        }

        /// <summary>
        /// Gets or sets the guest current direction.
        /// </summary>
        /// <value>The guest current direction.</value>
        public Direction GuestCurrentDirection
        {
            get { return guestCurrentDirection; }
            set
            {
                guestCurrentDirection = value;
                GuestPlayedEvent?.Invoke(guestCurrentDirection);
            }
        }
        
        // An events that clients can use to be notified whenever the MultiPlayerDS.Closed change.
        public event ChangedEventHandler SomebodyClosedTheGameEvent;
        public event ClienetPlayedEventHandler GuestPlayedEvent;
        public event ClienetPlayedEventHandler HostPlayActionOccurd;

        /// <summary>
        /// Initializes a new instance of the <see cref="MultiPlayerDS"/> class.
        /// </summary>
        /// <param name="hostClient">The host client.</param>
        /// <param name="nameOfGame">The name of game.</param>
        /// <param name="maze">The maze.</param>
        public MultiPlayerDS(TcpClient hostClient, string nameOfGame, Maze maze)
        {
            HostClient = hostClient;
            NameOfGame = nameOfGame;
            GuestClient = null;
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
            SomebodyClosedTheGameEvent?.Invoke(this, EventArgs.Empty);
        }
    }
}