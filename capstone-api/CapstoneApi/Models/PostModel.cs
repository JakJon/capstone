using System.ComponentModel.DataAnnotations;

public class PostModel
{
    [Key]
    public long Id { get; set; }
    public long UserID { get; set; }
    public UserModel User { get; set; }
    public string Description { get; set; }
    public string SongUrl { get; set; }
    public string SongArtist { get; set; }
    public string SongTitle { get; set; }

    // public PostModel()
    // {
    //     PostModel post = new PostModel();
    // }
}