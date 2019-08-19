using CoreLibrary.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace CoreLibrary
{
    public static class DIExtensions
    {
        public static IServiceCollection RegisterBaseServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IFileService<,>), typeof(FileService<,>));

            services.AddScoped(typeof(IUsersService<,,>), typeof(UsersService<,,>));
            services.AddScoped(typeof(IUsersService<,,,,,>), typeof(UsersService<,,,,,>));

            services.AddScoped(typeof(IBaseService<,,,,,>), typeof(BaseService<,,,,,>));
            services.AddScoped(typeof(IBaseService<,,>), typeof(BaseService<,,>));

            services.AddScoped(typeof(IDependentService<,,,,,,,,>), typeof(DependentService<,,,,,,,,>));
            services.AddScoped(typeof(IDependentService<,,,,,>), typeof(DependentService<,,,,,>));

            return services;
        }
    }
}
