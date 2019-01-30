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
    public class BaseApiController<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : Controller
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter : class, new()
    {        
        protected IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> _service { get; set; }

        protected int _pageSize { get; set; }

        public BaseApiController(IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> service)
        {
            _service = service;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<ActionResult<int>> GetPagesCount([FromQuery] int? pageSize = null, [FromQuery] TFilter filter = null)
        {
            try
            {
                if (!pageSize.HasValue) pageSize = _pageSize;
                return await _service.GetPagesCount(pageSize.Value, filter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpGet]
        public virtual async Task<ActionResult<List<TGrid>>> Grid([FromQuery] int pageNumber, [FromQuery] int? pageSize = null, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null)
        {
            try
            {
                if (!pageSize.HasValue) pageSize = _pageSize;
                return await _service.GetGrid(pageSize.Value, pageNumber, orderBy, filter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TCreate>> Create()
        {
            try
            {
                return await _service.Create();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpPost]
        public virtual async Task<ActionResult<TCreate>> Create([FromBody] TCreate create)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }   
            
            try
            {
                create = await _service.Create(create);
                return create;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TEdit>> Edit([FromQuery] TKey id)
        {
            try
            {
                return await _service.Edit(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpPost]
        public virtual async Task<ActionResult<TEdit>> Edit([FromBody] TEdit edit)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                edit = await _service.Edit(edit);
                return edit;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete([FromQuery] TKey id)
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

        [HttpDelete]
        public virtual async Task<IActionResult> DeleteMany([FromQuery] TKey[] ids)
        {
            try
            {
                await _service.Delete(ids);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TFilter>> GetFilter()
        {
            try
            {
                return await _service.GetFilter();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpGet]
        public virtual async Task<IActionResult> ExcelExport([FromQuery] string orderBy = null, [FromQuery] TFilter filter = null)
        {
            try
            {
                byte[] reportData = await _service.ExcelExport(orderBy, filter);
                return File(reportData, "application/vnd.openxmlformat");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpGet]
        public virtual async Task<IActionResult> ImportTemplate()
        {
            try
            {
                byte[] reportData = await _service.ImportTemplate();
                return File(reportData, "application/vnd.openxmlformat");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Import([FromBody] IFormFile file)
        {
            if (file == null)
                return BadRequest("File is null");
            try
            {                
                await _service.Import(file.OpenReadStream());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
    }
}
