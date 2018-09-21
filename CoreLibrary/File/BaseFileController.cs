using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace CoreLibrary
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BaseFileController<TFile, TKey> : Controller
        where TFile: FileModel<TKey>, new()
    {        
        protected IFileService<TFile, TKey> _service { get; set; }

        public BaseFileController(IFileService<TFile, TKey> service)
        {
            _service = service;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Download(TKey id)
        {
            var file = await _service.Get(id);
            if (file == null) BadRequest("File not found");
            return File(file.Data, file.MimeType, file.FileName);
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete(TKey id)
        {
            try
            {
                await _service.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null)
                return BadRequest("File is null");
            try
            {                
                var entity = await _service.Upload(file);
                return Ok(entity.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }
    }
}
