namespace PasswordManager.Server.Models
{
    public class Password
    {
        public Password(string name, string textPassword) 
        {
            Name = name;
            TextPassword = textPassword;
            DateAdd = DateTime.UtcNow;
        }

        public Guid Id { get; init; }
        public string Name { get; init; }
        public string TextPassword { get; init; }
        public DateTime DateAdd { get; init; }
    }
}
