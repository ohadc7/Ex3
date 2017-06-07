// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="Controller.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Net.Sockets;
using Ex1.Controller.Commands;
using Ex1.Model;

namespace Ex1.Controller
{ 
    /// <summary>
    /// Class Controller.
    /// </summary>
    /// <seealso cref="Ex1.Controller.IController" />
    internal class Controller : IController
    {
        /// <summary>
        /// The commands
        /// </summary>
        private Dictionary<string, ICommand> commands;
        /// <summary>
        /// The model
        /// </summary>
        private IModel model;

        /// <summary>
        /// Sets the model.
        /// </summary>
        /// <param name="model">The model.</param>
        public void SetModel(IModel model)
        {
            this.model = model;
            commands = new Dictionary<string, ICommand>();
            commands.Add("generate", new GenerateMazeCommand(model));
            commands.Add("solve", new SolveCommand(model));
            commands.Add("start", new StartCommand(model));
            commands.Add("list", new ListCommand(model));
            commands.Add("join", new JoinCommand(model));
        }

        /// <summary>
        /// Executes the command of Single Player games
        /// </summary>
        /// <param name="commandLine">The command line.</param>
        /// <param name="client">The client.</param>
        public void ExecuteCommand(string commandLine, TcpClient client)
        { 
            var parser = new CommandParser(commandLine);
            SinglePlayerGame sp;
            if (!commands.ContainsKey(parser.CommandKey))
            {
                sp = new SinglePlayerGame(client, "The command " + parser.CommandKey + " isn't known");
                sp.SendMassage();
            }
            else
            {
                var command = commands[parser.CommandKey];
                var packet = command.Execute(parser.Args, client);

                var result = packet.StringStream;
                if (!packet.MultiPlayer)
                {
                    //create new Single Player game to play with on client
                    sp = new SinglePlayerGame(client, result);
                    sp.SendMassage();
                }
            }
        }
    }
}