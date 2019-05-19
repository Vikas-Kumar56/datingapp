using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOS;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IDatingRepository DatingRepository { get; }
        private readonly IMapper mapper;

        public UserController(IDatingRepository datingRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.DatingRepository = datingRepository;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await DatingRepository.GetUsers();
            var usersDTO = mapper.Map<IEnumerable<UserForListDTO>>(users);
            return Ok(usersDTO);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await DatingRepository.GetUser(id);
            var userDTO = mapper.Map<UserForDetailDTO>(user);
            return Ok(userDTO);
        }
    }
}