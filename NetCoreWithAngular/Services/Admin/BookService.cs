using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreWithAngular.Services
{
    public class BookService : BaseService<Book, int, BookGridModel, BookViewModel, BookViewModel>
    {
        public BookService(IRepository<Book, int> repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public override IQueryable<Book> GetQuery()
        {
            return base.GetQuery().OrderByDescending(i => i.Id);
        }

        public override Task<List<BookGridModel>> GetGrid(int pageSize, int pageNumber)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.Add(new Book { Title = $"Book{i}", Author = $"Author{i}", PageCount = i });
                }
                _repository.SaveChanges();
            }
            return base.GetGrid(pageSize, pageNumber);
        }
    }    
}
