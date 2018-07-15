using CoreLibrary;
using NetCoreWithAngular.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace NetCoreWithAngular.ViewModels
{
    public class BookGridModel : IEntity<int>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public int? PageCount { get; set; }

        public string Genre { get; set; }
    }
}
