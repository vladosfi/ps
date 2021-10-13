using System.Net;
using System.Text;
using PS.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PS.API.Data;
using PS.API.Helpers.Messaging;
using PS.API.Data.Common.Interfaces;

namespace PS.API
{
    public class Startup
    {
        private readonly IWebHostEnvironment currentEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            this.currentEnvironment = env;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            if (this.currentEnvironment.IsDevelopment())
            {
                //Show SQL queries in dev mode
                services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());
            }
            else
            {
                services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            }


            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddTransient<IEmailSender>(x => new SendGridEmailSender(Configuration["SendGrid:ApiKey"]));
            services.AddCors();
            services.AddAutoMapper(typeof(PSRepository).Assembly);
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IPSRepository, PSRepository>();
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IEventsRepository, EventsRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                                .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (this.currentEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();

                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }



            //app.UseHttpsRedirection();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            //app.UseCors(x => x.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());


            app.UseRouting();
            app.UseStaticFiles();
            //app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("bs", "api/", new { controller = "Photos", action = "GetPhoto" });
                endpoints.MapControllers();

                endpoints.MapControllerRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Fallback", action = "Index" },
                    pattern: "{controller=Fallback}/{action=Index}/{id?}");

                endpoints.MapFallbackToController("Index", "Fallback");

            });
        }
    }
}
