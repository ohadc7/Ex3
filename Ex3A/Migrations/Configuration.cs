namespace Ex3A.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Ex3A.Models.UserContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Ex3A.Models.UserContext context)
        {
            new User()
            {
                Id = 0,
                Name = "Ohad Cohen",
                Email = "Ohadc7@gmail.com",
                Wins = 3,
                Loses = 1
            };
            new User()
            {
                Id = 1,
                Name = "Ido K",
                Email = "idok@gmail.com",
                Wins = 1,
                Loses = 3
            };
        }
    }
}
