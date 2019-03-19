using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;

namespace CoreLibrary.Identity
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersBaseController<TEntity, TKey, TViewModel> : UsersBaseController<TEntity, TKey, TViewModel, TViewModel, TViewModel, TViewModel>
        where TKey : System.IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TViewModel : class, IUserViewModel<TKey>, new()
    {
        public UsersBaseController(IUsersService<TEntity, TKey, TViewModel> service, IStringLocalizer localizer) : base(service, localizer)
        {
        }
    }

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersBaseController<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : Controller
        where TKey: System.IEquatable<TKey>
        where TEntity : IdentityUser<TKey>, IUser<TKey>
        where TCreate : class, IUserViewModel<TKey>, new()
        where TEdit : class, IUserViewModel<TKey>, new()
        where TGrid : class, IUserViewModel<TKey>, new()
        where TFilter : class, new()
    {
        protected IUsersService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> _service;
        protected readonly IStringLocalizer _localizer;

        protected int _pageSize { get; set; }

        public UsersBaseController(IUsersService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> service, IStringLocalizer localizer)
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
        public virtual async Task<ActionResult<List<TGrid>>> Grid([FromQuery] int pageNumber, [FromQuery] int? pageSize = null, [FromQuery] string orderBy = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
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
        public virtual async Task<ActionResult<TCreate>> Create()
        {
            try
            {
                return await _service.CreateAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }            
        }

        [HttpPost]
        public virtual async Task<ActionResult<TCreate>> Create([FromBody] TCreate create)
        {
            if (string.IsNullOrEmpty(create.Password))
                ModelState.AddModelError("Password", _localizer["FieldRequired"]);

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
        public virtual async Task<IActionResult> ExcelExport([FromQuery] string orderBy = null, [FromQuery] TFilter filter = null, [FromQuery] string searchString = null)
        {
            try
            {
                byte[] reportData = await _service.ExcelExportAsync(orderBy, filter, searchString);
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

        [HttpPost]
        public virtual async Task<IActionResult> ResetPassword([FromQuery] TKey id, [FromForm] string newPassword)
        {
            try
            {
                await _service.ResetPasswordAsync(id, newPassword);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetFullMessage());
            }
        }
    }
}
