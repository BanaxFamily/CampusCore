using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;

namespace CampusCore.API.Controllers
{
    [Route("api/submission")]
    [ApiController]
    public class SubmissionController : Controller
    {
        private ISubmissionService _submissionService;

        public SubmissionController(ISubmissionService submissionService)
        {
            _submissionService = submissionService;
        }

        //POST
        //CreateAsync(SubmissionAddViewModel model);
        [HttpPost("create")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> CreateAsync(SubmissionAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.CreateAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //        POST
        //        GetAllByCourseAsync(IntIdViewModel model);
        [HttpPost("getAllByCourse")]
        ////Authorize(Roles = "Dean,Faculty")]
        public async Task<IActionResult> GetAllByCourseAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllByCourseAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //        POST
        //        GetAllByStudentAsync(StringIdViewModel model);
        [HttpPost("getAllByStudent")]
        ////Authorize(Roles = "Dean,Faculty")]
        public async Task<IActionResult> GetAllByStudentAsync(StringIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllByStudentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        //POST
        //GetByIdAsync(IntIdViewModel model);
        //api/submission/getById
        [HttpPut("getById")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetByIdAsync([FromBody] IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }
        //SearchNameAsync(StringSearchViewModel model);


        //        POST
        //        DeleteAsync(IntIdViewModel model);
        [HttpDelete("delete")]
        // //Authorize(Roles = "Dean")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _submissionService.DeleteAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }
        //        PUT
        //        UpdateAsync(SubmissionUpdateViewModel model);
        // /api/submission/update
        [HttpPut("update")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> UpdateAsync([FromBody] SubmissionUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.UpdateAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //POST
        //GetUnapproved(IntIdViewModel model);
        [HttpPost("getUnapproved")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetUnapproved([FromBody] IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetUnapproved(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //        POST
        //        GetApprovedFaculty(IntIdViewModel model);
        [HttpPost("getFacultyApproved")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetApprovedFaculty([FromBody] IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetApprovedFaculty(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //POST
        //GetApprovedDean(IntIdViewModel model);
        [HttpPost("getDeanApproved")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetApprovedDean([FromBody] IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetApprovedDean(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //POST
        //GetApprovedPRC(IntIdViewModel model);
        [HttpPost("getPRCApproved")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetApprovedPRC([FromBody] IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetApprovedPRC(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }








    }
}
