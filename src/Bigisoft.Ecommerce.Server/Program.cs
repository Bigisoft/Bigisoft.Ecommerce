using Bigisoft.Ecommerce.Server.Infrastructure;
using Bigisoft.Ecommerce.Server.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Bigisoft.Ecommerce.Server.Infrastructure.Interceptors;
using FluentValidation;
using Microsoft.EntityFrameworkCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
builder.Services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();
builder.Services.AddDbContext<EcommerceDbContext>((serviceProvider, options) =>
{
    options.AddInterceptors(serviceProvider.GetServices<ISaveChangesInterceptor>());
    options.UseSqlServer(builder.Configuration.GetConnectionString("WinAuth"));
});

builder.Services.AddSingleton(TimeProvider.System);

builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
});

builder.Services.AddExceptionHandler<CustomExceptionHandler>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

app.UseDefaultFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(options => { });

app.MapControllers();

app.Run();
