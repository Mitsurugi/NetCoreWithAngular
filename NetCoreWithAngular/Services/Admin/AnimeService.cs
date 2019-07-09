using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using CoreLibrary;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Localization;
using Microsoft.EntityFrameworkCore;

namespace NetCoreWithAngular.Services
{
    public class AnimeService : BaseService<Anime, int, AnimeViewModel>, IAnimeService
    {
        private readonly IFileService<File, int> _fileService;

        public AnimeService(IRepository<Anime, int> repository, IMapper mapper, IFileService<File, int> fileService, IStringLocalizer localizer) : base(repository, mapper, localizer)
        {
            _fileService = fileService;
        }

        public override async Task<AnimeViewModel> SaveCreateModelAsync(AnimeViewModel createView)
        {
            int lastPos = 0;
            if (await _repository.GetQuery().AnyAsync())
            {
                lastPos = await _repository.GetQuery().MaxAsync(i => i.Position);
            }
            createView.Position = lastPos + 1;

            return await base.SaveCreateModelAsync(createView);
        }

        protected override IQueryable<Anime> ApplySorting(IQueryable<Anime> query, string orderBy)
        {
            return query.OrderBy(i => i.Position);
        }
        public override async Task<List<AnimeViewModel>> GetGridAsync(int pageSize, int pageNumber, string orderBy, AnimeViewModel filter, string searchString)
        {
            if (!_repository.GetQuery().Any())
            {
                for (int i = 1; i <= 10; i++)
                {
                    _repository.AddAsync( new Anime { Title = $"Anime{i}", SeasonCount = (i % 2) + 1 });
                }
                _repository.SaveChangesAsync();
            }

            return await base.GetGridAsync(pageSize, pageNumber, orderBy, filter, searchString);
        }

        public override async Task DeleteAsync(int id)
        {
            var delete = await GetByIdAsync(id);

            if (delete.ImageId.HasValue)
                await _fileService.DeleteAsync(delete.ImageId.Value);

            await _repository.DeleteAsync(delete.Id);
            await _repository.SaveChangesAsync();
        }

        public async Task MoveAsync(int id, int newPosition)
        {
            var field = await _repository.GetQuery().SingleOrDefaultAsync(i => i.Id == id);
            if (field == null) return;
            if (field.Position == newPosition) return;

            var toReorder = newPosition > field.Position ? _repository.GetQuery().Where(f => f.Position > field.Position && f.Position <= newPosition).ToList() : _repository.GetQuery().Where(f => f.Position < field.Position && f.Position >= newPosition).ToList();

            toReorder.ForEach(async f => { if (newPosition > field.Position) { f.Position = f.Position - 1; await _repository.UpdateAsync(f); } else { f.Position = f.Position + 1; await _repository.UpdateAsync(f); } });
            field.Position = newPosition;
            await _repository.UpdateAsync(field);
            await _repository.SaveChangesAsync();
        }
    }
}
