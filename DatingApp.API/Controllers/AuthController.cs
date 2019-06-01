using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOS;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;
        private readonly IConfiguration config;
        private readonly IMapper mapper;

        public AuthController(IAuthRepository authRepository,
        IConfiguration config, IMapper mapper)
        {
            this.mapper = mapper;
            this.authRepository = authRepository;
            this.config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserDTO user)
        {
            user.username = user.username.ToLower();
            if (await authRepository.UserExists(user.username))
            {
                ModelStateDictionary error = new ModelStateDictionary();
                error.AddModelError("username", "User Name already taken");
                return ValidationProblem(error);

            }

            var userToCreate = new User()
            {
                username = user.username
            };
            var createdUser = await authRepository.Register(userToCreate, user.password);

            return Ok(createdUser);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserForLoginDTO user)
        {
            var userFromRepo = await authRepository.Login(user.Username.ToLower(), user.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }
            var userDTO = mapper.Map<UserForDetailDTO>(userFromRepo);
            var claim = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user = userDTO
            });
        }
    }


}