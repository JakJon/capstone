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

        context.PostModels.AddRange(
            new PostModel{
                Id = 1,
                User = "Music Dude",
                SongTitle="Three Thirty",
                SongArtist="Reaper",
                SongUrl="https://www.youtube.com/embed/BEKTloAExfs?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=165",
                Description="Gnarly Bass Solo"
            },
            new PostModel{
                Id = 2,
                User = "Jake",
                SongTitle="Stand Tall",
                SongArtist="Childish Gambino",
                SongUrl="https://www.youtube.com/embed/WbsZnsr0lI4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=292",
                Description="Long Description Example: incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            new PostModel{
                Id = 3,
                User = "Alien",
                SongTitle="Lucid",
                SongArtist="4b Ft. Austin Mahone & Abraham Mateo",
                SongUrl="https://www.youtube.com/embed/Wsmr3UcxTz8?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=141&end=173",
                Description="Cool choppy synth effects 👽"
            },
            new PostModel{
                Id = 4,
                User = "Daryl",
                SongTitle="skip",
                SongArtist="Superparka",
                SongUrl="https://www.youtube.com/embed/4N4j7dNB4q4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=46&end=67",
                Description="This post has a specified end time."
            },
                        new PostModel{
                Id = 5,
                User = "Jake",
                SongTitle="100 Percent Chance of Showers",
                SongArtist="The Audiots",
                SongUrl="https://www.youtube.com/embed/_YVe16Sb0LQ?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=51&end=155",
                Description="Underground Garage Rock 🎸"
            },
                        new PostModel{
                Id = 6,
                User = "Alien",
                SongTitle="Naked",
                SongArtist="Bickle",
                SongUrl="https://www.youtube.com/embed/A-io6KSX4_c?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=159",
                Description="Crazy futuristic funky disco dance music 🕺 🌝"
            },
                                    new PostModel{
                Id = 7,
                User = "Jake",
                SongTitle="Bambi",
                SongArtist="Hippo Campus",
                SongUrl="https://www.youtube.com/embed/ntthrYgpOKY?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0",
                Description="Upbeat indie pop jam"
            },
                                    new PostModel{
                Id = 8,
                User = "Jake",
                SongTitle="Addicted Youth",
                SongArtist="Hemlock Ernst",
                SongUrl="https://www.youtube.com/embed/fUS4W8pzr0w?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=30",
                Description="Smooth laid back hip hop"
            },                                    new PostModel{
                Id = 9,
                User = "Daryl",
                SongTitle="No Rain",
                SongArtist="Blind melon",
                SongUrl="https://www.youtube.com/embed/3qVPNONdF58?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=10",
                Description="A classic"
            },                                    new PostModel{
                Id = 10,
                User = "Daryl",
                SongTitle="Float on",
                SongArtist="Modest Mouse",
                SongUrl="https://www.youtube.com/embed/CTAud5O7Qqk?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=130",
                Description="Another throw back from my childhood"
            },                                    new PostModel{
                Id = 11,
                User = "Jake",
                SongTitle="This Girl",
                SongArtist="Kungs",
                SongUrl="https://www.youtube.com/embed/2Y6Nne8RvaA?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=44",
                Description="Throwback to summer of 16'"
            },                                    new PostModel{
                Id = 12,
                User = "Jake",
                SongTitle="Professor Caveman",
                SongArtist="Toca La Guitarra",
                SongUrl="https://www.youtube.com/embed/H_XZT5uxiU4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=240",
                Description="Hard Rock, cool guitar, this song is relatively unknown."
            },                                    new PostModel{
                Id = 13,
                User = "Jake",
                SongTitle="The adults are talking",
                SongArtist="The Strokes",
                SongUrl="https://www.youtube.com/embed/o4qsjmLxhow?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0",
                Description="The strokes are back!"
            },                                    new PostModel{
                Id = 14,
                User = "Jake",
                SongTitle="Paper News",
                SongArtist="Ritt Momney",
                SongUrl="https://www.youtube.com/embed/xvGL-ctNH1A?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=62",
                Description="Emotional rollercoaster"
            },                                    new PostModel{
                Id = 15,
                User = "Jake",
                SongTitle="Techno Show",
                SongArtist="Peach Pit",
                SongUrl="https://www.youtube.com/embed/R2LrGpHZ6wY?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=43",
                Description="Indie pop rock with cool guitar solos"
            },                                    new PostModel{
                Id = 16,
                User = "Alien",
                SongTitle="Tell me lies",
                SongArtist="Asoh Black!",
                SongUrl="https://www.youtube.com/embed/0AdDA69QxVY?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0",
                Description="Unknown rap artist who deserves some more love"
            },                                    new PostModel{
                Id = 17,
                User = "Jake",
                SongTitle="Sorry",
                SongArtist="Hala",
                SongUrl="https://www.youtube.com/embed/gRgVCEB5yVw?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=89",
                Description="Upbeat indie rock. Feel Good Vibes ☀"
            },                                    new PostModel{
                Id = 18,
                User = "Alien",
                SongTitle="Shimmertraps",
                SongArtist="Plume",
                SongUrl="https://www.youtube.com/embed/k0k3EN9T3i0?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=18",
                Description="Chill electronic synth waves 🏄‍♂️"
            }

        );

            context.SaveChanges();
        }
    }
}