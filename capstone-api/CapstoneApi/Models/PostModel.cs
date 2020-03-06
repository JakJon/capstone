public class PostModel
{
    public long PostId { get; set; }
    public string User { get; set; }
    public string Description { get; set; }
    public SongModel Song { get; set; }

}