using System.Linq;
using AutoMapper;
using DatingApp.API.DTOS;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperprofile : Profile
    {
        public AutoMapperprofile()
        {
            CreateMap<User, UserForListDTO>()
               .ForMember(dest => dest.PhotoUrl, opt =>
               {
                   opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
               })
               .ForMember(dest => dest.Age, opt =>
               {
                   opt.MapFrom(src => src.DateOfBirth.CalculateAge());
               });
            CreateMap<User, UserForDetailDTO>()
               .ForMember(dest => dest.PhotoUrl, opt =>
               {
                   opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
               })
               .ForMember(dest => dest.Age, opt =>
               {
                   opt.MapFrom(src => src.DateOfBirth.CalculateAge());
               });
            CreateMap<User, UserForUpdateDTO>().ReverseMap();

            CreateMap<Photo, PhotoDTO>();
        }
    }
}