﻿using CoreLibrary;
using System.ComponentModel.DataAnnotations;

namespace NetCoreWithAngular.ViewModels
{
    public class AnimeEpisodeViewModel : IDependentEntity<int, int>
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int ParentId { get; set; }

        public string Title { get; set; }
        
    }
}
