﻿using AutoMapper;
using CoreLibrary;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using NetCoreAngular.Models;
using NetCoreAngular.ViewModels;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace NetCoreAngular.Services
{
    public class AnimeService : BaseService<Anime, int, AnimeViewModel>, IAnimeService
    {
        private readonly IFileService<File, int> _fileService;

        public AnimeService(IRepository<Anime, int> repository, IMapper mapper, IFileService<File, int> fileService, IStringLocalizer localizer, IHttpContextAccessor httpContext) : base(repository, mapper, localizer, httpContext)
        {
            _fileService = fileService;
        }

        public override CancellationToken CancellationToken { get => base.CancellationToken; set { base.CancellationToken = value; _fileService.CancellationToken = value; } }

        public override async Task<AnimeViewModel> SaveCreateModelAsync(AnimeViewModel createView)
        {
            int lastPos = 0;
            if (await GetQueryNoTracking().AnyAsync())
            {
                lastPos = await GetQueryNoTracking().MaxAsync(i => i.Position, _cancellationToken);
            }
            createView.Position = lastPos + 1;

            return await base.SaveCreateModelAsync(createView);
        }

        public override async Task DeleteAsync(int id)
        {
            var delete = await GetQueryNoTracking().SingleAsync(i => i.Id == id, _cancellationToken);

            if (delete.ImageId.HasValue)
                await _fileService.DeleteAsync(delete.ImageId.Value);

            await _repository.DeleteAsync(delete.Id);
            await _repository.SaveChangesAsync();
        }

        public async Task MoveAsync(int id, int newPosition)
        {
            bool needFix = false;
            var items = await GetQueryNoTracking().OrderBy(i => i.Position).ToListAsync(_cancellationToken);
            for (int i = 0; i < items.Count - 1; i++)
            {
                if (items[i + 1].Position - items[i].Position != 1) needFix = true;
            }
            if (needFix)
            {
                int position = 0;
                foreach (var item in items)
                {
                    item.Position = position;
                    await _repository.UpdateAsync(item);
                    position++;
                }
                await _repository.SaveChangesAsync();
            }

            var field = await GetQueryNoTracking().SingleOrDefaultAsync(i => i.Id == id, _cancellationToken);
            if (field == null) return;
            if (field.Position == newPosition) return;

            if (newPosition > field.Position)
            {
                await _repository.UpdateAsync(f => f.Position > field.Position && f.Position <= newPosition, f => f.Position = f.Position - 1);
            }
            else
            {
                await _repository.UpdateAsync(f => f.Position < field.Position && f.Position >= newPosition, f => f.Position = f.Position + 1);
            }

            field.Position = newPosition;
            await _repository.UpdateAsync(field);
            await _repository.SaveChangesAsync();
        }
    }
}
