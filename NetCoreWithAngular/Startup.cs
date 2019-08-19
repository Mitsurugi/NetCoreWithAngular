using AutoMapper;
using CoreLibrary;
using CoreLibrary.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;
using NetCoreWithAngular.DataAccess;
using NetCoreWithAngular.HostedServices;
using NetCoreWithAngular.Models;
using NetCoreWithAngular.Services;
using NetCoreWithAngular.ViewModels;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Claims;
using System.Text;

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
            services.AddScoped<IStringLocalizer, Localization.CustomStringLocalizer>();
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
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en-US"),
                SupportedCultures = new List<CultureInfo> { new CultureInfo("en-US"), new CultureInfo("ru-RU") },
                SupportedUICultures = new List<CultureInfo> { new CultureInfo("en-US"), new CultureInfo("ru-RU") }
            });
            app.UseMvc(routes => routes.MapSpaFallbackRoute("angular-fallback", new { controller = "Home", action = "Index" }));
        }
    }
}
