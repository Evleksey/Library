using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

using Library.Models;

namespace Library.Controllers
{
    [ApiController]
    public class BooksController : ControllerBase
    {
        
        [AcceptVerbs("GET", "OPTIONS")]
        [Route("books")]
        public async Task<List<Book>> GetAll()
        {
           
            using (var dc = new BooksContext())
            {
                return dc.Books.ToList();
            }
        }

        [AcceptVerbs("GET", "OPTIONS")]
        [Route("book/{id}")]
        public async Task<Book> GetOne(int id)
        {
            using (var dc = new BooksContext())
            {
                return dc.Books.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        [Authorize]
        [AcceptVerbs("POST", "OPTIONS")]
        [Route("book/add")]
        public async Task Add([FromBody] Book book)
        {
            using (var dc = new BooksContext())
            {
                dc.Books.Add(book);
                await dc.SaveChangesAsync();
            }
        }

        [Authorize]
        [AcceptVerbs("PUT", "OPTIONS")]
        [Route("book/update/{id}")]
        public async Task Update(int id, [FromBody] Book book)
        {

            using (var dc = new BooksContext())
            {
                var book_bd = dc.Books.Where(n => n.Id == id).FirstOrDefault();
                if (book_bd != null) 
                {
                    book_bd.Name = book.Name;
                    book_bd.Author = book.Author;
                    book_bd.Ganre = book.Ganre;
                    book_bd.Image = book.Image;
                    book_bd.ReleaseDate = book.ReleaseDate;
                };
                dc.SaveChanges();
            }
        }

        [Authorize]
        [AcceptVerbs("DELETE", "OPTIONS")]
        [Route("book/remove/{id}")]
        public async Task Delete(int id)
        {
            using (var dc = new BooksContext())
            {
                var book = dc.Books.Where(n => n.Id == id).FirstOrDefault();
                if (book != null) dc.Books.Remove(book);
                await dc.SaveChangesAsync();
            }
        }
    }
}
