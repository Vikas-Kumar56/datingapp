using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDTO userForUpdateDTO)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await DatingRepository.GetUser(id);

            mapper.Map(userForUpdateDTO, userFromRepo);

            if (await DatingRepository.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"updating user {id} failed on save");
        }
    }
}