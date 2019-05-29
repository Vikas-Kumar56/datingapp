using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTOS;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize()]
    [Route("api/user/{userId}/photos")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IDatingRepository datingRepository;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinarySettings;
        private readonly Cloudinary cloudinary;

        public PhotoController(IDatingRepository datingRepository, IMapper mapper,
                IOptions<CloudinarySettings> cloudinarySettings)
        {
            this.datingRepository = datingRepository;
            this.mapper = mapper;
            this.cloudinarySettings = cloudinarySettings;

            Account acc = new Account(
                cloudinarySettings.Value.CloudName,
                cloudinarySettings.Value.ApiKey,
                cloudinarySettings.Value.ApiSecret
            );

            cloudinary = new Cloudinary(acc);
        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoEntity = await datingRepository.GetPhoto(id);
            var photoDTO = mapper.Map<PhotoDTO>(photoEntity);
            return Ok(photoDTO);
        }
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDTO photoDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userEntity = await datingRepository.GetUser(userId);

            var file = photoDTO.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill")
                            .Gravity("face")
                    };

                    uploadResult = cloudinary.Upload(uploadParams);
                }
            }

            photoDTO.Url = uploadResult.Uri.ToString();
            photoDTO.PublicId = uploadResult.PublicId;

            var photo = mapper.Map<Photo>(photoDTO);

            if (!userEntity.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }

            userEntity.Photos.Add(photo);

            if (await datingRepository.SaveAll())
            {
                var photoToReturn = mapper.Map<PhotoDTO>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Failed to add photo");

        }
    }
}