using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class UserModel
{

    [Key]
    public long UserId { get; set; }

    public string Name { get; set; }

    public string Biography { get; set; }
    
    public virtual ICollection<PostModel> Post { get; set; }

}