using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace CoreLibrary
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BaseApiController<TEntity, TKey, TViewModel> : BaseApiController<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>
        where TEntity : class, IEntity<TKey>, new()
        where TViewModel : class, IEntity<TKey>, new()
    {
        public BaseApiController(IBaseService<TEntity, TKey, TViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BaseApiController<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : Controller
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter : class, new()
    {
        protected readonly IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> _service;
        protected readonly IStringLocalizer _localizer;

        protected int _pageSize { get; set; }

        public BaseApiController(IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> service, IStringLocalizer localizer)
        {
            _service = service;
            _localizer = localizer;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<ActionResult<int>> GetPagesCount([FromQuery] int? pageSize = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            try
            {
                if (!pageSize.HasValue) pageSize = _pageSize;
                return await _service.GetPagesCountAsync(pageSize.Value, filter, searchString);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpGet]
        public virtual async Task<ActionResult<List<TGrid>>> GetGrid([FromQuery] int pageNumber, [FromQuery] int? pageSize = null, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            try
            {
                if (!pageSize.HasValue) pageSize = _pageSize;
                return await _service.GetGridAsync(pageSize.Value, pageNumber, orderBy, filter, searchString);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TCreate>> GetCreateModel()
        {
            try
            {
                return await _service.GetCreateModelAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpPost]
        public virtual async Task<ActionResult<TCreate>> SaveCreateModel([FromBody] TCreate create)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }   
            
            try
            {
                create = await _service.SaveCreateModelAsync(create);
                return create;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TEdit>> GetEditModel([FromQuery] TKey id)
        {
            try
            {
                return await _service.GetEditModelAsync(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpPost]
        public virtual async Task<ActionResult<TEdit>> SaveEditModel([FromBody] TEdit edit)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                edit = await _service.SaveEditModelAsync(edit);
                return edit;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete([FromQuery] TKey id)
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

        [HttpDelete]
        public virtual async Task<IActionResult> DeleteMany([FromQuery] TKey[] ids)
        {
            try
            {
                await _service.DeleteAsync(ids);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TFilter>> GetFilterModel()
        {
            try
            {
                return await _service.GetFilterModelAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetExcelExport([FromQuery] string orderBy = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            try
            {
                byte[] reportData = await _service.GetExcelExportAsync(orderBy, filter, searchString);
                return File(reportData, "application/vnd.openxmlformat");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetImportTemplate()
        {
            try
            {
                byte[] reportData = await _service.GetImportTemplateAsync();
                return File(reportData, "application/vnd.openxmlformat");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Import([FromForm] IFormFile file)
        {
            if (file == null)
                return BadRequest(_localizer["FileNull"]);
            try
            {                
                await _service.ImportAsync(file.OpenReadStream());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
            return Ok();
        }
    }
}
