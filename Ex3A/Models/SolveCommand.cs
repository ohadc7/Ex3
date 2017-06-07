// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="SolveCommand.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using Adapter;
using Ex1.Model;
using Newtonsoft.Json.Linq;
using SearchAlgorithmsLib;
 
namespace Ex1.Controller.Commands
{
    /// <summary>
    /// Class SolveCommand.
    /// </summary>
    /// <seealso cref="Ex1.Controller.ICommand" />
    internal class SolveCommand : ICommand
    {
        /// <summary>
        /// The model
        /// </summary>
        private readonly IModel model;

        /// <summary>
        /// Initializes a new instance of the <see cref="SolveCommand"/> class.
        /// </summary>
        /// <param name="model">The model.</param>
        public SolveCommand(IModel model)
        {
            this.model = model;
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        private string Name { get; set; }
        /// <summary>
        /// Gets or sets the solution string builder.
        /// </summary>
        /// <value>The solution string builder.</value>
        private StringBuilder solutionStringBuilder { get; set; }

        /// <summary>
        /// Executes the specified arguments.
        /// </summary>
        /// <param name="args">The arguments.</param>
        /// <param name="client">The client.</param>
        /// <returns>PacketStream.</returns>
        public PacketStream Execute(string[] args, TcpClient client)
        {
            Name = args[0];
            var algorithmNumber = int.Parse(args[1]);
            //gets solution for the maze
            var solution = model.solve(Name, algorithmNumber);
            solutionStringBuilder = new StringBuilder("");
            var state = solution.Path.First;
            var point = state.Value as PointState;
            LinkedListNode<State> nextState;
            PointState nextPoint;
            for (nextState = state.Next; nextState != null; nextState = state.Next)
            {
                nextPoint = nextState.Value as PointState;
                if (nextPoint.CurrentPosition.Row == point.CurrentPosition.Row)
                {
                    if (nextPoint.CurrentPosition.Col < point.CurrentPosition.Col)
                        solutionStringBuilder.Append("0");
                    else
                        solutionStringBuilder.Append("1");
                }
                else
                {
                    if (nextPoint.CurrentPosition.Row < point.CurrentPosition.Row)
                        solutionStringBuilder.Append("2");
                    else
                        solutionStringBuilder.Append("3");
                }
                state = nextState;
                point = nextPoint;
            }
            var solvePacketStream = new PacketStream
            { 
                StringStream = ToJSON()
            };
            return solvePacketStream;
        }

        /// <summary>
        /// To the json.
        /// </summary>
        /// <returns>System.String.</returns>
        private string ToJSON()
        {
            var startJObject = new JObject
            {
                ["Name"] = Name,
                ["Solution"] = solutionStringBuilder.ToString(),
                ["NodesEvaluated"] = model.EvaluateNodes
            };

            return startJObject.ToString();
        }
    }
}