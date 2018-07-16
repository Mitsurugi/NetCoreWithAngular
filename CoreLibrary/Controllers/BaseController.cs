using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreLibrary
{
    public class BaseController<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> : Controller
        where TEntity : class, IEntity<TKey>, new()
        where TCreate : class, IEntity<TKey>, new()
        where TEdit : class, IEntity<TKey>, new()
        where TGrid : class, IEntity<TKey>, new()
        where TFilter: class, new()
    {        
        protected IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> _service { get; set; }

        protected int _pageSize { get; set; }

        public BaseController(IBaseService<TEntity, TKey, TGrid, TCreate, TEdit, TFilter> service)
        {
            _service = service;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Index([FromQuery] TFilter filter = null)
        {
            ViewData["PageCount"] = await _service.GetPagesCount(_pageSize, filter);
            return View();
        }

        [HttpGet]
        public virtual async Task<IActionResult> Grid(int pageNumber, int? pageSize = null, [FromQuery] TFilter filter = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return View(await _service.GetGrid(pageSize.Value, pageNumber, filter));
        }

        [HttpGet]
        public virtual async Task<IActionResult> Create()
        {
            return View(await _service.Create());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual async Task<IActionResult> Create(TCreate create)
        {
            if (!ModelState.IsValid)
            {
                return View(create);
            }   
            
            try
            {
                create = await _service.Create(create);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                return View(create);
            }
        }

        [HttpGet]
        public virtual async Task<IActionResult> Edit(TKey id)
        {
            return View(await _service.Edit(id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual async Task<IActionResult> Edit(TEdit edit)
        {

            if (!ModelState.IsValid)
            {
                return View(edit);
            }

            try
            {
                edit = await _service.Edit(edit);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                return View(edit);
            }
        }

        [HttpGet]
        public virtual async Task<IActionResult> Delete(TKey id)
        {
            try
            {
                await _service.Delete(id);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View("Error", model:"Can not delete this entity");
            }
        }

        [HttpGet]
        public virtual async Task<IActionResult> DeleteMany(TKey[] ids)
        {
            try
            {
                await _service.Delete(ids);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View("Error", model: "Can not delete this entity");
            }
        }
    }
}
