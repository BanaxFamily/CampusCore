﻿using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Controllers
{
    [Route("api/announcement")]
    [ApiController]
    public class AnnouncementController : Controller
    {
        private IAnnouncementService _announcementService;
        private UserManager<User> _userManager;
        private AppDbContext _context;

        public AnnouncementController(IAnnouncementService announcementService, UserManager<User> userManager, AppDbContext context)
        {
            _announcementService = announcementService;
            _userManager = userManager;
            _context = context;
        }

        // /api/announcement/create
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(AnnouncementAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementService.CreateAnnouncementAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        //api/announcement/getById
        [HttpPost("getById")]
        public async Task<IActionResult> GetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementService.GetByIdAnnouncementAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/announcement/getByOfferedCourse
        [HttpPost("getByOfferedCourse")]
        public async Task<IActionResult> GetByOfferedCourseAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementService.GetByOfferedCourseAnnouncementAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/announcement/getByUser
        [HttpPost("getByUser")]
        public async Task<IActionResult> GetAllByUserAsync(StringIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                
                
                var result = await _announcementService.GetAllByUserAnnouncementAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/announcement/viewList
        //insert method here
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementService.ViewAnnouncementListAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _announcementService.DeleteAnnouncementAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/announcement/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] AnnouncementUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementService.UpdateAnnouncementAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
