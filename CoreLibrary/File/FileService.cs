using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    public class FileService<TKey> : IFileService<TKey>
    {
        protected readonly IRepository<FileModel<TKey>, TKey> _repository;

        protected readonly IMapper _mapper;

        public FileService(IRepository<FileModel<TKey>, TKey> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public virtual async Task<FileModel<TKey>> Get(TKey id)
        {
            return await _repository.GetQuery().SingleAsync(i => i.Id.Equals(id));
        }

        public virtual async Task Delete(TKey id)
        {
            var delete = await Get(id);
            _repository.Delete(delete);
            await _repository.SaveChanges();
        }        

        public virtual async Task<FileModel<TKey>> Upload(IFormFile file)
        {
            var entity = new FileModel<TKey> { FileName = file.FileName, MimeType = file.ContentType };
            await file.OpenReadStream().ReadAsync(entity.Data, 0, (int)file.Length);
            entity = await _repository.Add(entity);
            await _repository.SaveChanges();

            return entity;
        }
    }
}
