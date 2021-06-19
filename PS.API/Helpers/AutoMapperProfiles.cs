using System.Linq;
using AutoMapper;
using PS.API.Dtos.Event;
using PS.API.Dtos.Painting;
using PS.API.Dtos.Photo;
using PS.API.Dtos.User;
using PS.API.Models;

namespace PS.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Photo
            CreateMap<Photo, PhotosForDetailedViewModel>();
            CreateMap<Photo, PhotoForReturnViewModel>();
            CreateMap<PhotoForCreationInputModel, Photo>();

            // User
            CreateMap<User, UserForDetailedViewModel>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForListViewModel>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<UserForUpdateInputModel, User>();
            CreateMap<UserForRegisterInputModel, User>();


            // Painting
            CreateMap<Image, PaintingImageForDetailedDto>();
            CreateMap<Painting, PaintingForListDto>()
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
            CreateMap<Painting, PaintingForDetailsDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
            CreateMap<Painting, PaintingForEditDetailsDto>();
            CreateMap<PaintingForCreationDto, Painting>();
            CreateMap<PaintingImageForCreateInputModel, Image>();
            CreateMap<PaintingForUpdateDto, Painting>();

            // Event
            CreateMap<Event, EventsForListViewModel>()
                .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
            CreateMap<EventForCreationInputModel, Event>();
            CreateMap<EventImage, ImageForDetailedViewModel>();
            CreateMap<Event, EventDetailsDto>()
                            .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.Where(i => i.IsMain == true).Select(i => i.Url + "/" + i.ImageFileName).FirstOrDefault()));
            //.ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.Select(i => i.Url + "/" + i.ImageFileName).ToArray()))
            CreateMap<Event, EventsLatestViewModel>()
                            .ForMember(dest => dest.MainImageUrl, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).Url))
                            .ForMember(dest => dest.ImageFileName, opt => opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsMain).ImageFileName));
        }
    }
}