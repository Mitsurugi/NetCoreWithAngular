using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using NetCoreWithAngular.Controllers;
using NetCoreWithAngular.DataAccess;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using NetCoreWithAngular.Services;
using Microsoft.AspNetCore.SpaServices.Webpack;
using CoreLibrary;
using AutoMapper;

namespace NetCoreWithAngular
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ExampleContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();

            //Custom Services
            services.AddScoped(typeof(IRepository<,>), typeof(ExampleRepository<,>));
            services.AddScoped(typeof(IBaseService<,,,,>), typeof(BaseService<,,,,>));

            services.AddScoped<IBaseService<Book, int, BookViewModel, BookViewModel, BookViewModel>, BookService>();
            services.AddScoped<IBaseService<Anime, int, AnimeViewModel, AnimeViewModel, AnimeViewModel>, AnimeService>();

            services.AddScoped<IFrontDataService, FrontDataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();            
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc(routes => routes.MapSpaFallbackRoute("angular-fallback", new { controller = "Home", action = "Index" }));
        }
    }
}
