using ContactFormApp.Data;
using ContactFormApp.Interfaces;
using ContactFormApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IContactForm, ContactFormService>();
builder.Services.AddSwaggerDocument(settings =>
{
    settings.Title = "ContactForm";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("ContactFormUI",
        builder =>
        {
            builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("ContactFormUI");
app.UseRouting();
app.UseOpenApi();
app.UseSwaggerUi();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=ContactForm}/{action=Index}/{id?}");

app.Run();
