using Microsoft.EntityFrameworkCore;
using TodoAppAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// ------------------- Services -------------------

// Enable controllers with JSON settings (prevent cyclic references)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Enable Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS for all origins/methods/headers (relax in dev, restrict in prod if needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("all", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ------------------- Database -------------------

// Load connection string from config (choose between "local" or "cloud")
var connectionString = builder.Configuration.GetConnectionString("local");

// Register EF Core DbContext
builder.Services.AddDbContext<TasklistContext>(options =>
    options.UseSqlServer(connectionString));

// ------------------- App Pipeline -------------------

var app = builder.Build();

// Development-only tools
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Production-friendly global exception handler
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(appBuilder =>
    {
        appBuilder.Run(async context =>
        {
            var exception = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>()?.Error;
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(new
            {
                error = exception?.Message,
                stackTrace = exception?.StackTrace
            }));
        });
    });
}

app.UseHttpsRedirection();
app.UseCors("all");
app.UseAuthorization();
app.MapControllers();

app.Run();
