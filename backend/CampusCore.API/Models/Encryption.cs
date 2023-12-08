namespace CampusCore.API.Models
{
    
    public class Encryption
    {
        public int Id { get; set; }
        public byte[] Key { get; set; }
        public byte[] Iv { get; set; }


    }
}
