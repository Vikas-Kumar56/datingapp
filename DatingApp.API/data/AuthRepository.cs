using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        public DataContext Context { get; }
        public AuthRepository(DataContext context)
        {
            this.Context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await Context.users.FirstOrDefaultAsync(x => x.username == username);
            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordSalt, user.PasswordHash))
            {
                return null;
            }

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                var newPasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                if (newPasswordHash.SequenceEqual(passwordHash))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await Context.users.AddAsync(user);
            await Context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await Context.users.AnyAsync(x => x.username == username))
            {
                return true;
            }

            return false;
        }
    }
}