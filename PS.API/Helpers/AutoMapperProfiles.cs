using AutoMapper;
using PS.API.Dtos;
using PS.API.Models;

namespace PS.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailedDto>();
            CreateMap<User, UserForListDto>();
        }
    }
}