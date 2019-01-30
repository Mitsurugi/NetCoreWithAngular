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

        public override Task<List<BookGridModel>> GetGrid(int pageSize, int pageNumber, string orderBy, BookFilterModel filter)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.Add(new Book { Title = $"Book{i}", Author = $"Author{i}", PageCount = i });
                }
                _repository.SaveChanges();
            }
            return base.GetGrid(pageSize, pageNumber, orderBy, filter);
        }

        protected override IQueryable<Book> ApplyFilter(IQueryable<Book> query, BookFilterModel filter)
        {
            if (filter == null)
                return query;

            if (!string.IsNullOrEmpty(filter.Author))
                query = query.Where(i => i.Author.Contains(filter.Author, StringComparison.InvariantCultureIgnoreCase));
            if (!string.IsNullOrEmpty(filter.Title))
                query = query.Where(i => i.Title.Contains(filter.Title, StringComparison.InvariantCultureIgnoreCase));
            if (filter.PageCount.HasValue)
                query = query.Where(i => i.PageCount == filter.PageCount);
            if (filter.Genre.HasValue)
                query = query.Where(i => i.Genre == filter.Genre);

            return query;
        }
    }    
}
