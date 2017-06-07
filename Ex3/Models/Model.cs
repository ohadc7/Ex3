// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="Model.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Net.Sockets;
using Adapter;
using MazeGeneratorLib;
using MazeLib;
using SearchAlgorithmsLib;

namespace Ex1.Model
{
    /// <summary>
    /// Class Model.
    /// </summary>
    /// <seealso cref="Ex1.Model.IModel" />
    internal class Model : IModel
    {

        /// <summary>
        /// Gets the dictionary of mazes.
        /// </summary>
        /// <value>The dictionary of mazes.</value>
        private Dictionary<string, Maze> DictionaryOfMazes { get; }
        /// <summary>
        /// Gets the dictionary of mazes and solutions.
        /// </summary>
        /// <value>The dictionary of mazes and solutions.</value>
        private Dictionary<SearchableMaze, Solution> DictionaryOfMazesAndSolutions { get; }
        /// <summary>
        /// Gets or sets the dictionary of multi player ds.
        /// </summary>
        /// <value>The dictionary of multi player ds.</value>
        public Dictionary<string, MultiPlayerDS> DictionaryOfMultiPlayerDS { get; set; }


        /// <summary>
        /// Initializes a new instance of the <see cref="Model"/> class.
        /// </summary>
        public Model()
        {
            DictionaryOfMazes = new Dictionary<string, Maze>();
            DictionaryOfMazesAndSolutions = new Dictionary<SearchableMaze, Solution>();
            DictionaryOfMultiPlayerDS = new Dictionary<string, MultiPlayerDS>();
        }

        /// <summary>
        /// Gets or sets the evaluate nodes.
        /// </summary>
        /// <value>The evaluate nodes.</value>
        public int EvaluateNodes { get; set; }
        /// <summary>
        /// Generates the specified name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <returns>Maze.</returns>
        public Maze generate(string name, int rows, int cols)
        {
            var dfsMazeGenerator = new DFSMazeGenerator();
            var MyMaze = dfsMazeGenerator.Generate(rows, cols);
            MyMaze.Name = name;
            DictionaryOfMazes[name] = MyMaze;
            return MyMaze;
        }

        /// <summary>
        /// Gets the multi player data structure.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns>MultiPlayerDS.</returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public MultiPlayerDS GetMultiPlayerDataStructure(string name)
        {
            if (DictionaryOfMultiPlayerDS.ContainsKey(name)) return DictionaryOfMultiPlayerDS[name];
            throw new NotImplementedException();
        }

        /// <summary>
        /// return list of optianl multi player games
        /// </summary>
        /// <returns>List&lt;System.String&gt;.</returns>
        public List<string> list()
        {
            var listOgGames = new List<string>();
            foreach (var mp in DictionaryOfMultiPlayerDS.Values)
                if (mp.AvailableToJoin)
                    listOgGames.Add(mp.NameOfGame);
            return listOgGames;
        }

        /// <summary>
        /// Solves the specified maze.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="algorithmNumber">The algorithm number.</param>
        /// <returns>Solution.</returns>
        public Solution solve(string name, int algorithmNumber)
        {
            var maze = DictionaryOfMazes[name];
            var searchableMaze = new SearchableMaze(maze);
            if (DictionaryOfMazesAndSolutions.ContainsKey(searchableMaze))
                return DictionaryOfMazesAndSolutions[searchableMaze];
            Solution solution;
            ISearcher searchAlgorithm = null;
            switch (algorithmNumber)
            {
                case 0:
                    searchAlgorithm = new BestFirstSearch<PointState>();
                    break;
                case 1:
                    searchAlgorithm = new DepthFirstSearch<PointState>();
                    break;
            }

            solution = searchAlgorithm.search(searchableMaze);
            EvaluateNodes = searchAlgorithm.getNumberOfNodesEvaluated();
            DictionaryOfMazesAndSolutions.Add(searchableMaze, solution);
            return solution;
        }
          
        /// <summary>
        /// Starts a new multi plyer game by set the info for it
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <param name="host">The host.</param>
        /// <returns>MultiPlayerDS.</returns>
        public MultiPlayerDS start(string name, int rows, int cols, TcpClient host)
        {
            if (DictionaryOfMazes.ContainsKey(name))
            {
                var multiPlayerDs = new MultiPlayerDS(host, name, DictionaryOfMazes[name]);
                DictionaryOfMultiPlayerDS.Add(name, multiPlayerDs);
                return multiPlayerDs;
            }
            else
            {
                var multiPlayerDs = new MultiPlayerDS(host, name, generate(name, rows, cols));
                DictionaryOfMultiPlayerDS.Add(name, multiPlayerDs);
                return multiPlayerDs;
            }
        }
    }
}