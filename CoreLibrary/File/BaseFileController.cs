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
    public class BaseFileController<TKey> : Controller
    {        
        protected IFileService<TKey> _service { get; set; }

        public BaseFileController(IFileService<TKey> service)
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
                await _service.Upload(file);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
    }
}
