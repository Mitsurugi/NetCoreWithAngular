using CoreLibrary;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace NetCoreWithAngular.ViewModels
{
    public class AnimeViewModel : IEntity<int>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int? SeasonCount { get; set; }
    }
}
