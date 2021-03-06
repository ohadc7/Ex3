﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Ex3A.Models;

namespace Ex3A.Controllers
{
    public class UsersController : ApiController
    {
        private UserContext db = new UserContext();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        

        [HttpGet]
        [Route("Users/{name}")]
        public string GetExistsUser(string name)
        {
             if(db.Users.Count(e => e.Name == name) > 0)
              {
                  return "exist";
              }
              else
              {
                  return "notExists";
              }
        }

        [HttpGet]
        [Route("Users/{name}/{password}/{dummy}")]
        public string GetCorrectUserAndPassword(string name, string password)
        {
            if (db.Users.Count(e => e.Name == name && e.Password == password) > 0)
            {
                return "OK";
            }
                return "notOk";
        }

        [HttpGet]
        [Route("Users/{name}/{dummy}")]
        public User GetUserByName(string name)
        {
            return db.Users.Where(e => e.Name == name).FirstOrDefault();
        }




        [HttpGet]
        [Route("Users/{winner}/{loser}/{dummy1}/{dummy2}")]
        public bool ChangeUserValue(string winner, string loser)
        {
            User winUser =  db.Users.Where(e => e.Name == winner).FirstOrDefault();
            winUser.Wins++;
            User loseUser = db.Users.Where(e => e.Name == loser).FirstOrDefault();
            loseUser.Loses++;
            db.Entry(winUser).State = EntityState.Modified;
            db.Entry(loseUser).State = EntityState.Modified;
            db.SaveChanges();
            return true;
        }



        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}