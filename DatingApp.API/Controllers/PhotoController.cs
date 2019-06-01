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

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> setMainPhoto(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userEntity = await datingRepository.GetUser(userId);
            var photoEntity = userEntity.Photos.FirstOrDefault(ph => ph.Id == id);
            if (photoEntity != null && !photoEntity.IsMain)
            {
                userEntity.Photos.FirstOrDefault(p => p.IsMain).IsMain = false;
                photoEntity.IsMain = true;
                if (await datingRepository.SaveAll())
                {
                    return NoContent();
                }


            }

            return BadRequest("Error is setting main photo");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userEntity = await datingRepository.GetUser(userId);
            if (userEntity != null)
            {
                var photo = userEntity.Photos.Where(p => p.Id == id).FirstOrDefault();

                if (photo != null)
                {
                    if (photo.IsMain)
                    {
                        return BadRequest("You cant delete your main photo");
                    }
                    var result = cloudinary.Destroy(new DeletionParams(photo.PublicId));
                    if (result.Result == "ok")
                    {
                        userEntity.Photos.Remove(photo);
                        if (await datingRepository.SaveAll())
                        {
                            return NoContent();
                        }
                    }

                }
            }

            return BadRequest();
        }
    }
}