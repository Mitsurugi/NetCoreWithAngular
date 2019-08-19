using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Threading.Tasks;

namespace CoreLibrary
{
    [Route("api/[controller]/[action]")]
    public class BaseFileController<TFile, TKey> : Controller
        where TFile : FileModel<TKey>, new()
    {
        protected readonly IFileService<TFile, TKey> _service;
        protected readonly IStringLocalizer _localizer;

        public BaseFileController(IFileService<TFile, TKey> service, IStringLocalizer localizer)
        {
            _service = service;
            _localizer = localizer;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Download(TKey id)
        {
            try
            {
                var file = await _service.GetAsync(id);
                if (file == null) BadRequest(_localizer["FileNotFound"]);
                return File(file.Data, file.MimeType, file.FileName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete(TKey id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null)
                return BadRequest(_localizer["FileNull"]);
            try
            {
                var entity = await _service.UploadAsync(file);
                return Ok(entity.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }
    }
}
