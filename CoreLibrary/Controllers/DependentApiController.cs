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

        [HttpPost]
        public virtual async Task<int> GetPagesCount([FromBody] TFilter filter, [FromQuery] TParentKey parentId, [FromQuery] int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return await _service.GetPagesCount(pageSize.Value, parentId, filter);
        }

        [HttpPost]
        public virtual async Task<List<TGrid>> Grid([FromBody] TFilter filter, [FromQuery] TParentKey parentId, [FromQuery] int pageNumber, [FromQuery] int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return await _service.GetGrid(pageSize.Value, pageNumber, parentId, filter);
        }

        [HttpGet]
        public virtual async Task<TCreate> Create([FromQuery] TParentKey parentId)
        {
            return await _service.Create(parentId);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create(TCreate create)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }   
            
            try
            {
                create = await _service.Create(create);
                return Ok(create);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public virtual async Task<TEdit> Edit(TKey id)
        {
            return await _service.Edit(id);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Edit(TEdit edit)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                edit = await _service.Edit(edit);
                return Ok(edit);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
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

        [HttpDelete]
        public virtual async Task<IActionResult> DeleteMany(TKey[] ids)
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
        public virtual async Task<TFilter> GetFilter()
        {
            return await _service.GetFilter();
        }

        [HttpPost]
        public virtual async Task<IActionResult> ExcelExport([FromQuery] TParentKey parentId, [FromBody] TFilter filter)
        {
            byte[] reportData = await _service.ExcelExport(parentId, filter);
            return File(reportData, "application/vnd.openxmlformat");
        }

        [HttpGet]
        public virtual async Task<IActionResult> ImportTemplate()
        {
            byte[] reportData = await _service.ImportTemplate();
            return File(reportData, "application/vnd.openxmlformat");
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
