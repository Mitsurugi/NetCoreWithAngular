using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    public class FileService<TFile, TKey> : IFileService<TFile, TKey>
        where TFile: FileModel<TKey>, new()
    {
        protected readonly IRepository<TFile, TKey> _repository;

        protected readonly IMapper _mapper;

        public FileService(IRepository<TFile, TKey> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<TFile> GetAsync(TKey id)
        {
            return await _repository.GetQueryNoTracking().SingleAsync(i => i.Id.Equals(id));
        }

        public virtual async Task DeleteAsync(TKey id)
        {
            await _repository.DeleteAsync(id);
            await _repository.SaveChangesAsync();
        }        

        public virtual async Task<TFile> UploadAsync(IFormFile file)
        {
            var entity = new TFile { FileName = file.FileName, MimeType = file.ContentType };
            entity.Data = new byte[file.Length];
            await file.OpenReadStream().ReadAsync(entity.Data, 0, (int)file.Length);
            entity = await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();

            return entity;
        }
    }
}
