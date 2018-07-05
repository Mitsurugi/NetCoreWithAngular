using CoreLibrary;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.ViewModels
{
    public class BookViewModel : IEntity<int>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public int? PageCount { get; set; }
    }
}
