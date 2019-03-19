﻿using System;
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
    public class DependentApiController<TEntity, TKey, TViewModel, TParentKey, TParentEntity, TParentView> : DependentApiController<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel, TParentKey, TParentEntity, TParentView>
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TViewModel : class, IDependentEntity<TKey, TParentKey>, new()
        where TParentEntity : class, IEntity<TParentKey>, new()
        where TParentView : class, IEntity<TParentKey>, new()
    {
        public DependentApiController(IDependentService<TEntity, TKey, TViewModel, TParentKey, TParentEntity, TParentView> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DependentApiController<TEntity, TKey, TGrid, TCreate, TEdit, TFilter, TParentKey, TParentEntity, TParentView> : Controller
        where TEntity : class, IDependentEntity<TKey, TParentKey>, new()
        where TCreate : class, IDependentEntity<TKey, TParentKey>, new()
        where TEdit : class, IDependentEntity<TKey, TParentKey>, new()
        where TGrid : class, IDependentEntity<TKey, TParentKey>, new()
        where TFilter : class, new()
        where TParentEntity : class, IEntity<TParentKey>, new()
        where TParentView : class, IEntity<TParentKey>, new()
    {
        protected readonly IDependentService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter, TParentKey, TParentEntity, TParentView> _service;
        protected readonly IStringLocalizer _localizer;
        protected int _pageSize { get; set; }

        public DependentApiController(IDependentService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter, TParentKey, TParentEntity, TParentView> service, IStringLocalizer localizer)
        {
            _service = service;
            _localizer = localizer;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<ActionResult<int>> GetPagesCount([FromQuery] TParentKey parentId, [FromQuery] int? pageSize = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            try
            {
                if (!pageSize.HasValue) pageSize = _pageSize;
                return await _service.GetPagesCountAsync(pageSize.Value, parentId, filter, searchString);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpGet]
        public virtual async Task<ActionResult<List<TGrid>>> Grid([FromQuery] TParentKey parentId, [FromQuery] int pageNumber, [FromQuery] int? pageSize = null, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;

            try
            {
                return await _service.GetGridAsync(pageSize.Value, pageNumber, parentId, orderBy, filter, searchString);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }                      
        }

        [HttpGet]
        public virtual async Task<ActionResult<TCreate>> Create([FromQuery] TParentKey parentId)
        {
            try
            {
                return await _service.CreateAsync(parentId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
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
                create = await _service.CreateAsync(create);
                return create;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }

        [HttpGet]
        public virtual async Task<ActionResult<TEdit>> Edit([FromQuery] TKey id)
        {
            try
            {
                return await _service.EditAsync(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
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
                edit = await _service.EditAsync(edit);
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
        public virtual async Task<ActionResult<TFilter>> GetFilter()
        {
            try
            {
                return await _service.GetFilterAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpGet]
        public virtual async Task<IActionResult> ExcelExport([FromQuery] TParentKey parentId, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            try
            {
                byte[] reportData = await _service.ExcelExportAsync(parentId, orderBy, filter, searchString);
                return File(reportData, "application/vnd.openxmlformat");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpGet]
        public virtual async Task<IActionResult> ImportTemplate()
        {
            try
            {
                byte[] reportData = await _service.ImportTemplateAsync();
                return File(reportData, "application/vnd.openxmlformat");
            } catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpPost]
        public virtual async Task<IActionResult> Import([FromQuery] TParentKey parentId, [FromForm] IFormFile file)
        {
            if (file == null)
                return BadRequest(_localizer["FileNull"]);
            try
            {                
                await _service.ImportAsync(parentId, file.OpenReadStream());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
            return Ok();
        }

        [HttpGet]
        public virtual async Task<ActionResult<TParentView>> GetParent([FromQuery] TParentKey parentId)
        {
            try
            {
                return await _service.GetParentViewAsync(parentId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }
    }
}
