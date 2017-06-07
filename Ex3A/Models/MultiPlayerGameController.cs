// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-20-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="MultiPlayerGameController.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Sockets;
using System.Threading;
using CommunicationSettings;
using Ex1.Controller;
using Ex1.Controller.Commands;
using MazeLib;
using Newtonsoft.Json.Linq;

namespace Ex1.Model
{
    /// <summary>
    /// Class MultiPlayerGameController.
    /// </summary>
    /// <seealso cref="Ex1.Controller.IController" />
    internal class MultiPlayerGameController : IController
    {
        /// <summary>
        /// The commands
        /// </summary>
        private readonly Dictionary<string, ICommand> commands;

        /// <summary>
        /// The iam host client
        /// </summary>
        private readonly bool IamHostClient;
        /// <summary>
        /// The model
        /// </summary>
        private IModel model;
        /// <summary>
        /// The multi player ds
        /// </summary>
        private readonly MultiPlayerDS multiPlayerDs;
        //private PacketStream packet;
        /// <summary>
        /// The reader
        /// </summary>
        private BinaryReader Reader;
        /// <summary>
        /// The stream
        /// </summary>
        private NetworkStream stream;
        /// <summary>
        /// The writer
        /// </summary>
        private BinaryWriter Writer;

        /// <summary>
        /// Initializes a new instance of the <see cref="MultiPlayerGameController"/> class.
        /// </summary>
        /// <param name="multiPlayerDs">The multi player ds.</param>
        /// <param name="amITheHostClient">if set to <c>true</c> [am i the host client].</param>
        public MultiPlayerGameController(MultiPlayerDS multiPlayerDs, bool amITheHostClient)
        {
            this.multiPlayerDs = multiPlayerDs;
            IamHostClient = amITheHostClient;

            //dictionary with the possible commands of multiplayer mode:
            commands = new Dictionary<string, ICommand>();
            commands.Add("play", new PlayCommand(multiPlayerDs, model));
            commands.Add("close", new CloseCommand(multiPlayerDs, model));
        }

        /// <summary>
        /// Executes the command.
        /// </summary>
        /// <param name="commandLine">The command line.</param>
        /// <param name="client">The client.</param>
        public void ExecuteCommand(string commandLine, TcpClient client)
        {
            //stream = client.GetStream();
            //Writer = new BinaryWriter(stream);
            var parser = new CommandParser(commandLine);
            if (!commands.ContainsKey(parser.CommandKey))
                Writer.Write("The command " + parser.CommandKey + " isn't known in a multiplayer game.");
            else
            {
                var command = commands[parser.CommandKey];
                command.Execute(parser.Args, client);
            }
        }

        /// <summary>
        /// Sets the model.
        /// </summary>
        /// <param name="model">The model.</param>
        public void SetModel(IModel model)
        {
            this.model = model;
        }

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        public void Initialize()
        {
            if (IamHostClient)
                WaitToOpponent();
            //initialize Writer and reader and subscribe to events of changes in the Multi player-Data-Structure:
            multiPlayerDs.SomebodyClosedTheGameEvent += DSBecameClosed;
            if (IamHostClient)
            {
                stream = multiPlayerDs.HostClient.GetStream();
                multiPlayerDs.GuestPlayedEvent += OpponentPlayed;
            }
            else
            {
                stream = multiPlayerDs.GuestClient.GetStream();
                multiPlayerDs.HostPlayActionOccurd += OpponentPlayed;
            }
            Reader = new BinaryReader(stream);
            Writer = new BinaryWriter(stream);
            Writer.Write(Messages.PassToMultiPlayerMassage);
        }

        /// <summary>
        /// Waits to opponent.
        /// </summary>
        private void WaitToOpponent()
        {
            while (multiPlayerDs.GuestClient == null)
                Thread.Sleep(100);
        }

        /// <summary>
        /// Manages the communication.
        /// </summary>
        public void ManageCommunication()
        {
            //send tha maze json to the clients
            Writer.Write(multiPlayerDs.MazeInit.ToJSON());

            //check who is the client now - host or guest
            var client = IamHostClient ? multiPlayerDs.HostClient : multiPlayerDs.GuestClient;
            //handle communication with our client (recieve commands and execute them):
            while (!multiPlayerDs.Closed)
                try
                {
                    var commandFromTheClient = Reader.ReadString();
                    ExecuteCommand(commandFromTheClient, client);
                }
                catch (Exception)
                {
                    Reader.Dispose();
                }
        }

        // This will be called whenever the list changes.
        /// <summary>
        /// ds the sbecame closed.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="EventArgs"/> instance containing the event data.</param>
        private void DSBecameClosed(object sender, EventArgs e)
        { 
            if (multiPlayerDs.Closed)
            {
                Writer.Write(Messages.PassToSinglePlayerMassage);
            }
        }

        /// <summary>
        /// send play direction to the opponet
        /// </summary>
        /// <param name="direction">The direction.</param>
        private void OpponentPlayed(Direction direction)
        {
            var s = PlayToJSON(direction);
            Writer.Write(s);
        }

        /// <summary>
        /// Plays to json.
        /// </summary>
        /// <param name="direction">The direction.</param>
        /// <returns>System.String.</returns>
        private string PlayToJSON(Direction direction)
        {
            var playJObject = new JObject
            {
                ["Name"] = multiPlayerDs.NameOfGame,
                ["Direction"] = direction.ToString()
            };

            return playJObject.ToString();
        }
    }
}