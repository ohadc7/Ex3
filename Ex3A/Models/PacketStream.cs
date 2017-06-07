// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-18-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="PacketStream.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace Ex1.Model
{ 
    /// <summary>
    /// Class PacketStream.
    /// </summary>
    internal class PacketStream
    { 
        /// <summary>
        /// Gets or sets a value indicating whether [multi player].
        /// </summary>
        /// <value><c>true</c> if [multi player]; otherwise, <c>false</c>.</value>
        public bool MultiPlayer { get; set; } = false;
        /// <summary>
        /// Gets or sets the multi player ds.
        /// </summary>
        /// <value>The multi player ds.</value>
        public MultiPlayerDS MultiPlayerDs { get; set; }
        /// <summary>
        /// Gets or sets the string stream.
        /// </summary>
        /// <value>The string stream.</value>
        public string StringStream { get; set; }
    }
}