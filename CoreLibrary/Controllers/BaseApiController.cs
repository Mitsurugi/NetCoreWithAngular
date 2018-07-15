using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreLibrary
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BaseApiController<TEntity, TKey, TGrid, TCreate, TEdit> : Controller
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
    {        
        protected IBaseService<TEntity, TKey, TGrid, TCreate, TEdit> _service { get; set; }

        protected int _pageSize { get; set; }

        public BaseApiController(IBaseService<TEntity, TKey, TGrid, TCreate, TEdit> service)
        {
            _service = service;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<int> GetPagesCount(int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return await _service.GetPagesCount(pageSize.Value);
        }

        [HttpGet]
        public virtual async Task<List<TGrid>> Grid(int pageNumber, int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return await _service.GetGrid(pageSize.Value, pageNumber);
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
    }
}
