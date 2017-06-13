using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ex3A.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Wins { get; set; }
        public int Loses { get; set; }
    }
}