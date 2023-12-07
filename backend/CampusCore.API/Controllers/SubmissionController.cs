using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;
using static CampusCore.Shared.GetSubmissionsForFacultyViewModel;

namespace CampusCore.API.Controllers
{
    [Route("api/submission")]
    [ApiController]
    public class SubmissionController : Controller
    {
        private ISubmissionService _submissionService;
        private IVersionService _versionService;

        public SubmissionController(ISubmissionService submissionService, IVersionService versionService)
        {
            _submissionService = submissionService;
            _versionService = versionService;
        }

        //POST
        //CreateAsync(SubmissionAddViewModel model);
        [HttpPost("firstSubmission")]
        //Authorize(Roles = "Student")]
        public async Task<IActionResult> FirstSubmission([FromForm] FirstSubmissionViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.FirstSubmission(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpPost("addNewVersion")]
        //Authorize(Roles = "Student")]
        public async Task<IActionResult> AddNewVersion([FromForm] AddNewVersionViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.AddNewVersion(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //        POST
        //        GetAllByCourseAsync(IntIdViewModel model);
        [HttpPost("getAllByOfferedCourseDeliverable")]
        ////Authorize(Roles = "Dean,Faculty")]
        public async Task<IActionResult> GetAllByCourseAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllByOfferedCourseDeliverableAsync(model);

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
        public async Task<IActionResult> GetAllByStudentAsync(GetSubmissionsByStudentViewModel model)
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
        [HttpPost("getAllSubmissionsForFaculty")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetAllSubmissionsForFaculty(GetSubmissionsForFacultyViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllSubmissionsForFaculty(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //        POST
        //        GetApprovedFaculty(IntIdViewModel model);
        [HttpPost("getAllSubmissionsForDean")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetAllSubmissionsForDean(GetSubmissionsForDeanViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllSubmissionsForDean(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //POST
        //GetApprovedDean(IntIdViewModel model);
        [HttpPost("getAllSubmissionsForPRC")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetAllSubmissionsForPRC(GetSubmissionsForPRCViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllSubmissionsForPRC(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //this model contains OfferedCourseId since Faculty, Dean, PRC will view this when inside an offered course
        //POST
        //GetApprovedPRC(IntIdViewModel model);
        [HttpPost("getAllSubmissionsForAdviserReview")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> GetAllSubmissionsForAdviserReview(GetSubmissionsForAdviserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.GetAllSubmissionsForAdviserReview(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }
        [HttpPost("search")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> SearchNameAsync([FromBody] StringSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.SearchNameAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        [HttpPost("approve")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> ApproveAsync([FromBody] DigitalSignatureViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.Approve(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }
        
        [HttpPost("adviserApprove")]
        //Authorize(Roles = "Dean")]
        public async Task<IActionResult> AdviserApprove(SubmissionAdviserApproveViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _submissionService.AdviserApprove(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        [HttpPost("getAllSubmissionVersions")]
        //Authorize(Roles = "Dean,Faculty,Student")]
        public async Task<IActionResult> GetAllSubmissionVersionsAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _versionService.GetAllSubmissionVersionsAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpPost("getVersionById")]
        //Authorize(Roles = "Dean,Faculty,Student")]
        public async Task<IActionResult> GetVersionById(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _versionService.GetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpGet("getAllVersions")]
        //Authorize(Roles = "Dean,Faculty,Student")]
        public async Task<IActionResult> GetAllAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _versionService.GetAllAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        
        [HttpPost("getLatestVersion")]
        //Authorize(Roles = "Dean,Faculty,Student")]
        public async Task<IActionResult> GetLatestVersionAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _versionService.GetLatestVersionAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }








    }
}