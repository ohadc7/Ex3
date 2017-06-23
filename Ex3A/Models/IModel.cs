// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="IModel.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Collections.Generic;
using System.Net.Sockets;
using MazeLib;
using SearchAlgorithmsLib;
using Microsoft.AspNet.SignalR.Hubs;

namespace Ex3A.Models
{ 
    /// <summary>
    /// Interface IModel
    /// </summary>
    internal interface IModel
    {
        /// <summary>
        /// Gets or sets the dictionary of multi player ds.
        /// </summary>
        /// <value>The dictionary of multi player ds.</value>
        Dictionary<string, MultiPlayerDS> DictionaryOfMultiPlayerDS { get; set; }
        /// <summary>
        /// Gets or sets the evaluate nodes.
        /// </summary>
        /// <value>The evaluate nodes.</value>
        int EvaluateNodes { get; set; }
        /// <summary>
        /// Generates the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <returns>Maze.</returns>
        Maze Generate(string name, int rows, int cols);
        /// <summary>
        /// Solves the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="algorithmNumber">The algorithm number.</param>
        /// <returns>Solution.</returns>
        string Solve(string name, int algorithmNumber);
        /// <summary>
        /// Starts the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <param name="client">The client.</param>
        /// <returns>MultiPlayerDS.</returns>
        //MultiPlayerDS Start(string name, int rows, int cols, string ConnectionId);
        MultiPlayerDS Start(string mazeName, int rows, int cols, string username);
        /// <summary>
        /// Lists this instance.
        /// </summary>
        /// <returns>List&lt;System.String&gt;.</returns>
        List<string> List();

        //MultiPlayerDS Join(string name, string ConnectId);
        MultiPlayerDS Join(string mazeName, string username);
        /// <summary>
        /// Gets the multi player data structure.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>MultiPlayerDS.</returns>
        MultiPlayerDS GetMultiPlayerDataStructure(string name);

        void updateWinnerOfGame(string gameName, string winnerUsername);
    }
}