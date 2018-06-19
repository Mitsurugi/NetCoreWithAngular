using CoreLibrary;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.ViewModels
{
    public class BookViewModel : IEntity<int>
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Author")]
        public string Author { get; set; }

        [Display(Name = "Page count")]
        public int PageCount { get; set; }
    }
}
