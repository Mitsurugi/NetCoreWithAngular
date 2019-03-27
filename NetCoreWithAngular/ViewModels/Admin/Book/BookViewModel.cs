﻿using System.Linq;
using CoreLibrary;
using NetCoreWithAngular.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.ViewModels
{
    public class BookViewModel : IEntity<int>
    {        
        [ImportIgnore]
        public int Id { get; set; }

        [Required]
        [Display(Name = "BookTitle")]
        public string Title { get; set; }

        [Display(Name = "BookAuthor")]
        public string Author { get; set; }

        [Display(Name = "BookPageCount")]
        public int? PageCount { get; set; }
        
        [Display(Name = "BookGenre")]
        [HasList("GenreList")]
        public Genre? Genre { get; set; }

        [ImportIgnore]
        public IEnumerable<SelectListItem> GenreList { get; set; }        
    }
}
