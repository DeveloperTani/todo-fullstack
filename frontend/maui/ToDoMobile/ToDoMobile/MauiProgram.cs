using Microsoft.Extensions.Logging;
using ToDoMobile.Services;
using ToDoMobile.ViewModels;

namespace ToDoMobile
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();

            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

            // --- Service Registration ---
            builder.Services.AddSingleton<HttpClient>(); // Shared HttpClient for API calls

            // App-specific services
            builder.Services.AddSingleton<TaskService>();

            // ViewModels
            builder.Services.AddSingleton<MainViewModel>();
            builder.Services.AddTransient<AddTaskViewModel>();

            // Pages
            builder.Services.AddSingleton<MainPage>();
            builder.Services.AddTransient<AddTaskPage>();

#if DEBUG
            builder.Logging.AddDebug(); // Debug logging for development
#endif

            return builder.Build();
        }
    }
}