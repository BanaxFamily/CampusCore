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

        // /api/announcementComment/viewComments
        //insert method here
        [HttpPost("viewComments")]
        public async Task<IActionResult> GetAllByAnnouncement(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _announcementCommentService.GetAllByAnnouncement(model);

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

                var result = await _announcementCommentService.DeleteAnnouncementCommentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

       


    }
}
