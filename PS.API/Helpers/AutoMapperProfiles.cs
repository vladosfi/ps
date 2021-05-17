using System.Linq;
using AutoMapper;
using PS.API.Dtos;
using PS.API.Models;

namespace PS.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Image, PaintingImageForDetailedDto>();
            CreateMap<Painting, PaintingForListDto>()
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
            CreateMap<Painting, PaintingForDetailsDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
            CreateMap<PaintingForCreationDto, Painting>();
            CreateMap<ImageForCreateDto, Image>();
            CreateMap<PaintingForUpdateDto, Painting>();
            CreateMap<Event, EventsForListDto>()
                .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
            CreateMap<EventForCreationDto, Event>();
            CreateMap<EventImage, EventImageForDetailedDto>();
            CreateMap<Event, EventDetailsDto>()
                            .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.Where(i => i.IsMain == true).Select(i => i.Url + "/" + i.ImageFileName).FirstOrDefault()));
            //.ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(i => i.Url + "/" + i.ImageFileName).ToArray()))
            CreateMap<Event, EventsLatestDto>()
                            .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                            .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
        }
    }
}