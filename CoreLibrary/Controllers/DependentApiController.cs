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
    public class DependentApiController<TEntity, TKey, TParentKey, TGrid, TCreate, TEdit, TFilter> : Controller
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TCreate : class, IDependentEntity<TKey, TParentKey>, new()
        where TEdit : class, IDependentEntity<TKey, TParentKey>, new()
        where TGrid : class, IDependentEntity<TKey, TParentKey>, new()
        where TFilter : class, new()
    {        
        protected IDependentService<TEntity, TKey, TParentKey, TGrid, TCreate, TEdit, TFilter> _service { get; set; }

        protected int _pageSize { get; set; }

        public DependentApiController(IDependentService<TEntity, TKey, TParentKey, TGrid, TCreate, TEdit, TFilter> service)
        {
            _service = service;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<ActionResult<int>> GetPagesCount([FromQuery] TParentKey parentId, [FromQuery] int? pageSize = null, [FromQuery] TFilter filter = null)
        {
            try
            {
                if (!pageSize.HasValue) pageSize = _pageSize;
                return await _service.GetPagesCount(pageSize.Value, parentId, filter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpGet]
        public virtual async Task<ActionResult<List<TGrid>>> Grid([FromQuery] TParentKey parentId, [FromQuery] int pageNumber, [FromQuery] int? pageSize = null, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null)
        {
            try
            {
                return await _service.GetGrid(pageSize.Value, pageNumber, parentId, orderBy, filter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            if (!pageSize.HasValue) pageSize = _pageSize;            
        }

        [HttpGet]
        public virtual async Task<ActionResult<TCreate>> Create([FromQuery] TParentKey parentId)
        {
            try
            {
                return await _service.Create(parentId);
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
        public virtual async Task<IActionResult> ExcelExport([FromQuery] TParentKey parentId, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null)
        {
            try
            {
                byte[] reportData = await _service.ExcelExport(parentId, orderBy, filter);
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
            } catch (Exception ex)
            {
                return BadRequest(ex);
            }            
        }

        [HttpPost]
        public virtual async Task<IActionResult> Import(TParentKey parentId, IFormFile file)
        {
            if (file == null)
                return BadRequest("File is null");
            try
            {                
                await _service.Import(parentId, file.OpenReadStream());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }
    }
}
