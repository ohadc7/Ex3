﻿// ***********************************************************************
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
using System.Text;
using Microsoft.AspNet.SignalR.Hubs;

namespace Ex3A.Models
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
        private Dictionary<SearchableMaze, string> DictionaryOfMazesAndSolutions { get; }
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
            DictionaryOfMazesAndSolutions = new Dictionary<SearchableMaze, string>();
            DictionaryOfMultiPlayerDS = new Dictionary<string, MultiPlayerDS>();
            //DictionaryOfMultiPlayerDS.Add("test", new MultiPlayerDS("test","test",new Maze()));
        }

        /// <summary>
        /// Gets or sets the evaluate nodes.
        /// </summary>
        /// <value>The evaluate nodes.</value>
        public int EvaluateNodes { get; set; }
        /// <summary>
        /// Generates the specified name.
        /// </summary>
        /// <param name="gameName">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <returns>Maze.</returns>
        public Maze Generate(string gameName, int rows, int cols)
        {
            var dfsMazeGenerator = new DFSMazeGenerator();
            var MyMaze = dfsMazeGenerator.Generate(rows, cols);
            MyMaze.Name = gameName;
            DictionaryOfMazes[gameName] = MyMaze;
            return MyMaze;
        }

        /// <summary>
        /// Gets the multi player data structure.
        /// </summary>
        /// <param name="gameName">The name.</param>
        /// <returns>MultiPlayerDS.</returns>
        /// <exception cref="System.NotImplementedException"></exception>
        public MultiPlayerDS GetMultiPlayerDataStructure(string gameName)
        {
            if (DictionaryOfMultiPlayerDS.ContainsKey(gameName)) return DictionaryOfMultiPlayerDS[gameName];
            throw new NotImplementedException();
        }

        /// <summary>
        /// return list of optianl multi player games
        /// </summary>
        /// <returns>List&lt;System.String&gt;.</returns>
        public List<string> List()
        {
            var listOgGames = new List<string>();
            foreach (var mp in DictionaryOfMultiPlayerDS.Values)
                if (mp.AvailableToJoin)
                    listOgGames.Add(mp.NameOfGame);
            return listOgGames;
        }

        //public MultiPlayerDS Join(string name, string ConnectId)
        public MultiPlayerDS Join(string gameName, string username)
        {
            if (DictionaryOfMultiPlayerDS[gameName].AvailableToJoin)
            {
                DictionaryOfMultiPlayerDS[gameName].AvailableToJoin = false;
                DictionaryOfMultiPlayerDS[gameName].usernameOfJoinPlayer = username;
                return DictionaryOfMultiPlayerDS[gameName];
            } else
            {
                return null;
            }
        }

        /// <summary>
        /// Solves the specified maze.
        /// </summary>
        /// <param name="mazeName">The name.</param>
        /// <param name="algorithmNumber">The algorithm number.</param>
        /// <returns>Solution.</returns>
        public string Solve(string mazeName, int algorithmNumber)
        {
            var maze = DictionaryOfMazes[mazeName];
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
            string solutionString = ConvertSolution(solution);
            DictionaryOfMazesAndSolutions.Add(searchableMaze, solutionString);
            return solutionString;
        }
          

        private string ConvertSolution(Solution solution)
        {
            StringBuilder solutionStringBuilder = new StringBuilder("");
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
            return solutionStringBuilder.ToString();
        }


        /// <summary>
        /// Starts a new multi plyer game by set the info for it
        /// </summary>
        /// <param name="gameName">The name.</param>
        /// <param name="rows">The rows.</param>
        /// <param name="cols">The cols.</param>
        /// <param name="host">The host.</param>
        /// <returns>MultiPlayerDS.</returns>
        public MultiPlayerDS Start(string gameName, int rows, int cols, string username)
        {
            if(DictionaryOfMultiPlayerDS.ContainsKey(gameName))
            {
                return null;
            } else
            {
                var maze = Generate(gameName, rows, cols); //generate and add to dictionary
                var multiPlayerDs = new MultiPlayerDS(gameName, maze, username);
                DictionaryOfMultiPlayerDS.Add(gameName, multiPlayerDs);
                return multiPlayerDs;
            }
        }

        public void Play(string move, string ConnectionId)
        {

        }

        public void updateWinnerOfGame(string gameName, string winnerUsername)
        {
            
        }

    }

}