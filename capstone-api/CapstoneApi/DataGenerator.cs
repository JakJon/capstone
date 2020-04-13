using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using CapstoneApi.Models;

public class DataGenerator
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new PostContext(
            serviceProvider.GetRequiredService<DbContextOptions<PostContext>>()))
        {
            if (context.PostModels.Any())
            {
                return;
            }

        context.UserModels.AddRange(
            new UserModel{
                Id = 1,
                Name = "Jake",
                Biography = "Example BIO"
            }
        );

        context.PostModels.AddRange(
            new PostModel{
                Id = 1,
                UserID = 1,
                SongTitle="Three Thirty",
                SongArtist="Reaper",
                SongUrl="https://www.youtube.com/embed/BEKTloAExfs?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=165",
                Description="Gnarly Bass Solo"
            },
            new PostModel{
                Id = 2,
                UserID = 1,
                SongTitle="Stand Tall",
                SongArtist="Childish Gambino",
                SongUrl="https://www.youtube.com/embed/WbsZnsr0lI4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=292",
                Description="Long Description Example: incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            new PostModel{
                Id = 3,
                UserID = 1,
                SongTitle="Lucid",
                SongArtist="4b Ft. Austin Mahone & Abraham Mateo",
                SongUrl="https://www.youtube.com/embed/Wsmr3UcxTz8?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=141&end=173",
                Description="Cool choppy synth effects 👽"
            },
            new PostModel{
                Id = 4,
                UserID = 1,
                SongTitle="skip",
                SongArtist="Superparka",
                SongUrl="https://www.youtube.com/embed/4N4j7dNB4q4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=46&end=67",
                Description="This post has a specified end time."
            },
            new PostModel{
                Id = 5,
                UserID = 1,
                SongTitle="100 Percent Chance of Showers",
                SongArtist="The Audiots",
                SongUrl="https://www.youtube.com/embed/_YVe16Sb0LQ?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=51&end=155",
                Description="Underground Garage Rock 🎸"
            },
            new PostModel{
                Id = 6,
                UserID = 1,
                SongTitle="You know you're not alright",
                SongArtist="nicholas Franchise",
                SongUrl="https://www.youtube.com/embed/1kChMtdiN7U?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=162",
                Description="Upbeat Indie Rock"
            }

        );

            context.SaveChanges();
        }
    }
}