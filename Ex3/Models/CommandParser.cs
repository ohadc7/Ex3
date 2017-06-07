// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-20-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="CommandParser.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.Linq;

namespace Ex1.Controller
{
    /// <summary>
    /// Class CommandParser.
    /// </summary>
    internal class CommandParser
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CommandParser"/> class.
        /// </summary>
        /// <param name="commandLine">The command line.</param>
        public CommandParser(string commandLine)
        { 
            var arr = commandLine.Split(' ');
            CommandKey = arr[0];
            Args = arr.Skip(1).ToArray();
        }
         
        /// <summary>
        /// Gets the command key.
        /// </summary>
        /// <value>The command key.</value>
        public string CommandKey { get; }
        /// <summary>
        /// Gets the arguments.
        /// </summary>
        /// <value>The arguments.</value>
        public string[] Args { get; }
    }
}