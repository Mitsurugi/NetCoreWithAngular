using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System;

namespace NetCoreWithAngular.Services
{
    public class BookService : BaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>
    {
        public BookService(IRepository<Book, int> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override Task<List<BookGridModel>> GetGrid(int pageSize, int pageNumber, string orderBy, BookFilterModel filter, string searchString)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.Add(new Book { Title = $"Book{i}", Author = $"Author{i}", PageCount = i });
                }
                _repository.SaveChanges();
            }
            return base.GetGrid(pageSize, pageNumber, orderBy, filter, searchString);
        }

        protected override IQueryable<Book> ApplySorting(IQueryable<Book> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy))
                return query.OrderByDescending(i => i.Id);

            return base.ApplySorting(query, orderBy);
        }
    }    
}
