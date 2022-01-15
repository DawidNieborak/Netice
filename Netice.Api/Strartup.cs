using Hangfire;
using Hangfire.MemoryStorage;
using IdentityModel;
using IdentityModel.Client;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Netice.Api.BackgroundServices;
using Netice.Api.Controllers;
using Netice.Api.Settings;
using Netice.Data;

namespace Netice.Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly string AllowAll = "All";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

       
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Dev"));

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            
            // httpclient factor
            services.AddHttpClient();
            
            // hangfire
            services.AddHangfire(config => config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseDefaultTypeSerializer()
                .UseMemoryStorage()
                .UseDarkModeSupportForDashboard()
            );
            
            services.AddHangfireServer();
            services.AddSingleton<IFetchTwitterData, FetchTwitterData>();
            services.AddSingleton<IHangfireHandler, HangfireHandler>();
            

            // tests
            // todo delete 
            services.AddSingleton<TestController>();

            services.AddCors(options => options.AddPolicy(AllowAll, builder =>
            {
                builder.AllowAnyHeader()
                    .AllowAnyOrigin();
            }));

            services.AddHttpContextAccessor();
            
            services.AddRazorPages();
            AddIdentity(services);
            
            // Twitter HttpClient
            services.AddHttpClient("twitter", c =>
            {
                c.SetBearerToken(DevKeys.bearToken);

                c.BaseAddress = new Uri("https://api.twitter.com/2/users/");
                c.DefaultRequestHeaders.Add("User-Agent", "nodejs");
            });
        }
        
        public void Configure(IApplicationBuilder app,
            IServiceProvider serviceProvider, 
            IRecurringJobManager recurringJobManager
        )
        {
            if (_env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }

            app.UseStaticFiles();

            app.UseCors(AllowAll);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseIdentityServer();

            app.UseAuthorization();

            app.UseHangfireDashboard("/hangfire");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });
        }

        private void AddIdentity(IServiceCollection services)
        {
            services.AddDbContext<IdentityDbContext>(config =>
                config.UseInMemoryDatabase("DevIdentity"));

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
                {
                    // options.User.RequireUniqueEmail = true;
                    
                    if (_env.IsDevelopment())
                    {
                        options.Password.RequireDigit = false;
                        options.Password.RequiredLength = 4;
                        options.Password.RequireLowercase = false;
                        options.Password.RequireUppercase = false;
                        options.Password.RequireNonAlphanumeric = false;
                    }
                    else
                    {
                        //todo configure for production
                    }
                })
                .AddEntityFrameworkStores<IdentityDbContext>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(config =>
            {
                config.LoginPath = "/Account/Login";
                config.LogoutPath = "/api/auth/logout";
            });

            var identityServerBuilder = services.AddIdentityServer();

            identityServerBuilder.AddAspNetIdentity<IdentityUser>();

            if (_env.IsDevelopment())
            {
                identityServerBuilder.AddInMemoryIdentityResources(new IdentityResource[]
                {
                    new IdentityResources.OpenId(),
                    new IdentityResources.Profile(),
                    new IdentityResource(NoticeConstants.IdentityResources.RoleScope, new[] { NoticeConstants.Claims.Role }),
                });

                identityServerBuilder.AddInMemoryApiScopes(new ApiScope[]
                {
                    new ApiScope(
                        IdentityServerConstants.LocalApi.ScopeName, 
                        new[]
                        {
                            JwtClaimTypes.PreferredUserName,
                            NoticeConstants.Claims.Role,
                            
                        }
                        
                        ),
                });

                identityServerBuilder.AddInMemoryClients(new Client[]
                {
                    new Client
                    {
                        ClientId = "web-client",
                        AllowedGrantTypes = GrantTypes.Code,

                        RedirectUris = new[] {"http://localhost:3000/oidc/sign-in-callback.html"},
                        PostLogoutRedirectUris = new[] {"http://localhost:3000"},
                        AllowedCorsOrigins = new[] {"http://localhost:3000"},

                        AllowedScopes = new[]
                        {
                            IdentityServerConstants.StandardScopes.OpenId,
                            IdentityServerConstants.StandardScopes.Profile,
                            IdentityServerConstants.LocalApi.ScopeName,
                            NoticeConstants.IdentityResources.RoleScope,
                        },

                        RequirePkce = true,
                        AllowAccessTokensViaBrowser = true,
                        RequireConsent = false,
                        RequireClientSecret = false,
                    },
                });

                identityServerBuilder.AddDeveloperSigningCredential();
            }

            services.AddLocalApiAuthentication();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(NoticeConstants.Policies.Mod, policy =>
                {
                    var is4Policy = options.GetPolicy(IdentityServerConstants.LocalApi.PolicyName);
                    policy.Combine(is4Policy);
                    policy.RequireClaim(NoticeConstants.Claims.Role, NoticeConstants.Roles.Mod);
                });
            });
        }
    }
    
    public struct NoticeConstants
    {
        public struct Policies
        {
            public const string User = IdentityServerConstants.LocalApi.PolicyName;
            public const string Mod = nameof(Mod);
        }
        
        public struct IdentityResources
        {
            public const string RoleScope = "role";
        }
        
        public struct Claims
        {
            public const string Role = "role";
        }

        public struct Roles
        {
            public const string Mod = nameof(Mod);
        }
    }
}
