using System;
using System.Collections.Generic;

#nullable disable

namespace Library.Models
{
    public partial class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ganre { get; set; }
        public string Author { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Image { get; set; }
    }
}
