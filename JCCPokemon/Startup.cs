﻿using EnergyTypeConnector;
using JCCP.AuthentificationConnector;
using JCCP.BlocConnector;
using JCCP.CardConnector;
using JCCP.ExtensionConnector;
using JCCP.PokemonConnector;
using JCCP.RarityConnector;
using JCCP.SqlConnector;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace JCCPokemon
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
            services.Configure<SqlServiceOptions>(Configuration.GetSection("SqlConfiguration"));
            services.AddTransient<ISqlService, SqlService>();
            services.AddTransient<IAuthentificationService, AuthentificationService>();
            services.AddTransient<IBlocService, BlocService>();
            services.AddTransient<IExtensionService, ExtensionService>();
            services.AddTransient<IPokemonService,PokemonService>();
            services.AddTransient<ICardService, CardService > ();
            services.AddTransient<IEnergyTypeService, EnergyTypeService>();
            services.AddTransient<IRarityService, RarityService>();
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = "/Authentification/SignIn/";
                });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsAdmin", policy => policy.RequireClaim(ClaimTypes.Role, "admin"));
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
