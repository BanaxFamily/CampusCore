﻿using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/announcementComment")]
    [ApiController]
    public class AnnouncementCommentController : Controller
    {
        private IAnnouncementCommentService _announcementCommentService;

        public AnnouncementCommentController(IAnnouncementCommentService announcementCommentService)
        {
            _announcementCommentService = announcementCommentService;
        }

        // /api/announcementComment/create
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(AnnouncementCommentAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementCommentService.CreateAnnouncementCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/announcementComment/viewList
        //insert method here
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementCommentService.ViewAnnouncementCommentListAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _announcementCommentService.DeleteAnnouncementCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/announcementComment/update
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] AnnouncementCommentUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementCommentService.UpdateAnnouncementCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
