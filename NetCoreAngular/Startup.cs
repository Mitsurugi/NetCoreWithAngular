using AutoMapper;
using CoreLibrary;
using CoreLibrary.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;
using NetCoreAngular.DataAccess;
using NetCoreAngular.HostedServices;
using NetCoreAngular.Localization;
using NetCoreAngular.Models;
using NetCoreAngular.Services;
using NetCoreAngular.ViewModels;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Claims;
using System.Text;

namespace NetCoreAngular
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
            services.AddControllersWithViews().AddNewtonsoftJson();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddScoped<IStringLocalizer, CustomStringLocalizer>();
            services.AddDbContext<ExampleContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<User, IdentityRole<System.Guid>>(options =>
            {
                options.Password.RequireDigit = false; options.Password.RequiredLength = 1; options.Password.RequiredUniqueChars = 1; options.Password.RequireLowercase = false; options.Password.RequireNonAlphanumeric = false; options.Password.RequireUppercase = false;
            }).AddEntityFrameworkStores<ExampleContext>().AddDefaultTokenProviders();

            services.AddMvc();
            services.AddAutoMapper(typeof(MappingProfile));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                string appName = "NetCoreAngular";
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
            services.AddScoped<IIdentityService<User, System.Guid>, IdentityService>();
            services.RegisterBaseServices();

            services.AddScoped<IBaseService<Book, int, BookGridModel, BookViewModel, BookViewModel, BookFilterModel>, BookService>();
            services.AddScoped<IBaseService<Anime, int, AnimeViewModel>, AnimeService>();
            services.AddScoped<IDependentService<AnimeEpisode, int, AnimeEpisodeViewModel, int, Anime, AnimeViewModel>, AnimeEpisodeService>();

            services.AddScoped<IFrontDataService, FrontDataService>();
            services.AddScoped<IAnimeService, AnimeService>();

            services.AddHostedService<HostedService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
            
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en-US"),
                SupportedCultures = new List<CultureInfo> { new CultureInfo("en-US"), new CultureInfo("ru-RU") },
                SupportedUICultures = new List<CultureInfo> { new CultureInfo("en-US"), new CultureInfo("ru-RU") }
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
