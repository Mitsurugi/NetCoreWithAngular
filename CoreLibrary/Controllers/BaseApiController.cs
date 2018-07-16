using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public virtual async Task<int> GetPagesCount([FromBody] TFilter filter, [FromQuery] int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return await _service.GetPagesCount(pageSize.Value, filter);
        }

        [HttpPost]
        public virtual async Task<List<TGrid>> Grid([FromBody] TFilter filter, [FromQuery] int pageNumber, [FromQuery] int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return await _service.GetGrid(pageSize.Value, pageNumber, filter);
        }

        [HttpGet]
        public virtual async Task<TCreate> Create()
        {
            return await _service.Create();
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
    }
}
