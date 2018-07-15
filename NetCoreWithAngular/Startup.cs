﻿using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetCoreWithAngular.DataAccess;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.ViewModels;
using NetCoreWithAngular.Services;
using Microsoft.AspNetCore.SpaServices.Webpack;
using CoreLibrary;
using CoreLibrary.Identity;
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
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ExampleContext>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();

            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                string appName = "NetCoreWithAngular";
                configureOptions.Audience = appName;
                configureOptions.ClaimsIssuer = appName;
                configureOptions.IncludeErrorDetails = true;
                configureOptions.RequireHttpsMetadata = false;
                configureOptions.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    RoleClaimType = ClaimsIdentity.DefaultRoleClaimType,
                    NameClaimType = ClaimsIdentity.DefaultNameClaimType,
                    RequireExpirationTime = false,
                    RequireSignedTokens = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = appName,
                    ValidIssuer = appName,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("PrivateKey_YouShallNotPass"))
                };
            });

            //Custom Services
            services.AddScoped(typeof(IRepository<,>), typeof(ExampleRepository<,>));
            services.AddScoped(typeof(IBaseService<,,,,>), typeof(BaseService<,,,,>));

            services.AddScoped<IIdentityService<IdentityUser, IdentityRole, UserManager<IdentityUser>, RoleManager<IdentityRole>, SignInManager<IdentityUser>>, IdentityService>();

            services.AddScoped<IBaseService<Book, int, BookGridModel, BookViewModel, BookViewModel>, BookService>();
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
            app.UseAuthentication();
            app.UseMvc(routes => routes.MapSpaFallbackRoute("angular-fallback", new { controller = "Home", action = "Index" }));
        }
    }
}
