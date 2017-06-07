// ***********************************************************************
// Assembly         : Ex1
// Author           : Cohen
// Created          : 04-20-2017
//
// Last Modified By : Cohen
// Last Modified On : 04-21-2017
// ***********************************************************************
// <copyright file="SinglePlayerGame.cs" company="">
//     Copyright ©  2017
// </copyright>
// <summary></summary>
// ***********************************************************************
using System.IO;
using System.Net.Sockets;

namespace Ex1.Model
{
    /// <summary>
    /// Class SinglePlayerGame.
    /// </summary>
    internal class SinglePlayerGame
    {
        /// <summary>
        /// The client
        /// </summary>
        private readonly TcpClient client;
        /// <summary>
        /// The stream
        /// </summary>
        private readonly string stream;

        /// <summary>
        /// Initializes a new instance of the <see cref="SinglePlayerGame"/> class.
        /// </summary>
        /// <param name="client">The client.</param>
        /// <param name="stream">The stream.</param>
        public SinglePlayerGame(TcpClient client, string stream)
        {
            this.client = client;
            this.stream = stream;
        }
          
        /// <summary>
        /// Sends the massage.
        /// </summary>
        public void SendMassage()
        {
            using (var stream = client.GetStream())
            using (var reader = new BinaryReader(stream))
            using (var writer = new BinaryWriter(stream))
            {
                writer.Write(this.stream);
            }
            //close the socket after the message sent
            client.Close();
        }
    }
}