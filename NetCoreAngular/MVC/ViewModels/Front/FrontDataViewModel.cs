﻿using CoreLibrary;

namespace NetCoreAngular.ViewModels
{
    public class FrontDataViewModel : IEntity<int>
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }
}
