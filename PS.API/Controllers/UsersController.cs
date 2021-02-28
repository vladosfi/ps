using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PS.API.Data;
using PS.API.Dtos;
using PS.API.Helpers;
using PS.API.Models;

namespace PS.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private const string genderMale = "male";
        private const string genderFemale = "female";
        private const string likeFailed = "Failed to like user";
        private const string alreadyLikedUser = "You already like this user";
        private const string userUpdatingFailed = "Updating user {0} failed on save";

        private readonly IPSRepository repo;
        private readonly IMapper mapper;

        public UsersController(
            IPSRepository repo,
            IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await this.repo.GetUser(currentserId);

            userParams.UserId = currentserId;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == genderMale ? genderFemale : genderMale;
            }

            var users = await this.repo.GetUsers(userParams);

            var usersToReturn = this.mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }


        [HttpGet("{id}")]
        [ActionName(nameof(GetUser))]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await this.repo.GetUser(id);

            var userToReturn = this.mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await this.repo.GetUser(id);

            this.mapper.Map(userForUpdateDto, userFromRepo);

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception(string.Format(userUpdatingFailed, id));
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var like = await this.repo.GetLike(id, recipientId);

            if (like != null)
            {
                return BadRequest(alreadyLikedUser);
            }

            if (await this.repo.GetUser(recipientId) == null)
            {
                return NotFound();
            }

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId,
            };

            this.repo.Add<Like>(like);

            if (await this.repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest(likeFailed);
        }
    }
}