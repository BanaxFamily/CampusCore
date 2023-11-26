﻿using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/announcement")]
    [ApiController]
    public class AnnouncementController : Controller
    {
        private IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        // /api/announcement/create
        [Authorize(Roles = "Admin,Dean,Faculty,PRC")]
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
        [Authorize(Roles = "Dean,Faculty,Student,PRC")]
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

        // /api/announcement/viewList
        //insert method here
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
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

        [Authorize(Roles = "Admin,Dean,Faculty,PRC")]
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
        [Authorize(Roles = "Admin,Dean,Faculty,PRC")]
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
