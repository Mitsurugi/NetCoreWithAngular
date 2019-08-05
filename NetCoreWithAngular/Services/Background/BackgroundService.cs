using System;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.Extensions.Hosting;
using CoreLibrary;
using NetCoreWithAngular.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace NetCoreWithAngular.Services
{
    public class BackgroundService : IHostedService, IDisposable
    {
        private Timer _timer;
        private IServiceProvider _serviceProvider;

        public BackgroundService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(TimerEvent);
            _timer.Change(0, 1000 * 60);
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(-1, -1);
        }

        private async void TimerEvent(object state)
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var bookRepository = scope.ServiceProvider.GetRequiredService<IRepository<Book, int>>();
                    if (!(await bookRepository.GetQueryNoTracking().AnyAsync()))
                    {
                        for (int i = 1; i <= 10; i++)
                        {
                            await bookRepository.AddAsync(new Book { Title = $"Book{i}", Author = $"Author{i}", PageCount = i });
                        }
                        await bookRepository.SaveChangesAsync();
                    }
                }
                
            }
            catch { }
            
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var animeRepository = scope.ServiceProvider.GetRequiredService<IRepository<Anime, int>>();
                    if (!(await animeRepository.GetQueryNoTracking().AnyAsync()))
                    {
                        for (int i = 1; i <= 10; i++)
                        {
                            await animeRepository.AddAsync(new Anime { Title = $"Anime{i}", SeasonCount = (i % 2) + 1 });
                        }
                        await animeRepository.SaveChangesAsync();
                    }
                }                
            }
            catch { }
            
        }
    }
}
