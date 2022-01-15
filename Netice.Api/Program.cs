using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Netice.Data;
using Netice.Models;

namespace Netice.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();

                if (env.IsDevelopment())
                {
                    var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
                    var user = new IdentityUser("test@test.com")
                    {
                        Id = "test_user_id", Email = "test@test.com"
                    };
                    userMgr.CreateAsync(user, "password").GetAwaiter().GetResult();
                    
                    ctx.Add(new User
                    {
                        Id = user.Id,
                        Username = user.UserName,
                    });

                    ctx.Add(new ConnectedSocials
                    {
                        ConnectedSocialsId = user.Id,
                        Beartoken = "",
                        AccessSecret = "test123",
                        SocialProfileUsername = "matkoxd",
                        DataGetUrl = "https://twitter.api/elonmusk/data",
                        AccessToken = "",
                        SocialName = "Instagram",
                        SocialId = 0,
                        Created = DateTime.Now,
                        SocialProfileId = 44196399
                    });
                    
                    ctx.Add(new ConnectedSocials
                    {
                        ConnectedSocialsId = user.Id,
                        Beartoken = "",
                        AccessSecret = "123512234325",
                        SocialProfileUsername = "wyczyn2",
                        DataGetUrl = "https://youtube.api/wyczyn2/data",
                        AccessToken = "1245123523452435435436",
                        SocialName = "Youtube",
                        SocialId = 1,
                        Created = DateTime.Now,
                        SocialProfileId = 44196397
                    });
                    ctx.SaveChanges();

                    var mod = new IdentityUser("mod@mod.com");
                    userMgr.CreateAsync(mod, "password").GetAwaiter().GetResult();
                    userMgr.AddClaimAsync(mod, new Claim(NoticeConstants.Claims.Role, NoticeConstants.Roles.Mod))
                        .GetAwaiter()
                        .GetResult();
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}