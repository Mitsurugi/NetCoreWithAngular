using CoreLibrary;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.ViewModels
{
    public class BookViewModel : IEntity<int>
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public int PageCount { get; set; }
    }
}
