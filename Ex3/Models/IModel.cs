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

namespace Ex1.Model
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
        Maze generate(string name, int rows, int cols);
        /// <summary>
        /// Solves the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="algorithmNumber">The algorithm number.</param>
        /// <returns>Solution.</returns>
        Solution solve(string name, int algorithmNumber);
        /// <summary>
        /// Starts the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <param name="client">The client.</param>
        /// <returns>MultiPlayerDS.</returns>
        MultiPlayerDS start(string name, int rows, int cols, TcpClient client);
        /// <summary>
        /// Lists this instance.
        /// </summary>
        /// <returns>List&lt;System.String&gt;.</returns>
        List<string> list();
        /// <summary>
        /// Gets the multi player data structure.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>MultiPlayerDS.</returns>
        MultiPlayerDS GetMultiPlayerDataStructure(string name);
    }
}