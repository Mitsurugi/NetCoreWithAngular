using CoreLibrary;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NetCoreWithAngular.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace NetCoreWithAngular.HostedServices
{
    public class HostedService : IHostedService, IDisposable
    {
        private Timer _timer;
        private IServiceProvider _serviceProvider;

        public HostedService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(async (state) => { await TimerEvent(cancellationToken); });
            _timer.Change(0, 1000 * 10);
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(-1, -1);
        }

        private async Task TimerEvent(CancellationToken cancellationToken)
        {
            try
            {
                var t1 = Task.Run(async () => await CreateAnime(cancellationToken));
                var t2 = Task.Run(async () => await CreateBooks(cancellationToken));

                await Task.WhenAll(t1, t2);
            }
            catch { }
        }

        private async Task CreateBooks(CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var bookRepository = scope.ServiceProvider.GetRequiredService<IRepository<Book, int>>();
                bookRepository.CancellationToken = cancellationToken;
                if (!(await bookRepository.GetQueryNoTracking().AnyAsync(cancellationToken)))
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        await bookRepository.AddAsync(new Book { Title = $"Book{i}", Author = $"Author{i}", PageCount = i });
                    }
                    await bookRepository.SaveChangesAsync();
                }
            }
        }

        private async Task CreateAnime(CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var animeRepository = scope.ServiceProvider.GetRequiredService<IRepository<Anime, int>>();
                animeRepository.CancellationToken = cancellationToken;
                if (!(await animeRepository.GetQueryNoTracking().AnyAsync(cancellationToken)))
                {
                    for (int i = 1; i <= 10; i++)
                    {
                        await animeRepository.AddAsync(new Anime { Title = $"Anime{i}", SeasonCount = (i % 2) + 1 });
                    }
                    await animeRepository.SaveChangesAsync();
                }
            }
        }
    }
}
