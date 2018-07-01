using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CoreLibrary
{
    public class BaseController<TEntity, TKey, TEntityCreate, TEntityEdit, TEntityGrid> : Controller
        where TEntity : class, IEntity<TKey>, new()
        where TEntityCreate : class, IEntity<TKey>, new()
        where TEntityEdit : class, IEntity<TKey>, new()
        where TEntityGrid : class, IEntity<TKey>, new()
    {        
        protected IBaseService<TEntity, TKey, TEntityCreate, TEntityEdit, TEntityGrid> _service { get; set; }

        protected int _pageSize { get; set; }

        public BaseController(IBaseService<TEntity, TKey, TEntityCreate, TEntityEdit, TEntityGrid> service)
        {
            _service = service;
            _pageSize = 10;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Index()
        {
            ViewData["PageCount"] = await _service.GetPagesCount(_pageSize);
            return View();
        }

        [HttpGet]
        public virtual async Task<IActionResult> Grid(int pageNumber, int? pageSize = null)
        {
            if (!pageSize.HasValue) pageSize = _pageSize;
            return View(await _service.GetGrid(pageSize.Value, pageNumber));
        }

        [HttpGet]
        public virtual async Task<IActionResult> Create()
        {
            return View(await _service.Create());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual async Task<IActionResult> Create(TEntityCreate create)
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
        public virtual async Task<IActionResult> Edit(TEntityEdit edit)
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
