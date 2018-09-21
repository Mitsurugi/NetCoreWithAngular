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

        public virtual async Task<TFile> Get(TKey id)
        {
            return await _repository.GetQuery().SingleAsync(i => i.Id.Equals(id));
        }

        public virtual async Task Delete(TKey id)
        {
            var delete = await Get(id);
            _repository.Delete(delete);
            await _repository.SaveChanges();
        }        

        public virtual async Task<TFile> Upload(IFormFile file)
        {
            var entity = new TFile { FileName = file.FileName, MimeType = file.ContentType };
            entity.Data = new byte[file.Length];
            await file.OpenReadStream().ReadAsync(entity.Data, 0, (int)file.Length);
            entity = await _repository.Add(entity);
            await _repository.SaveChanges();

            return entity;
        }
    }
}
