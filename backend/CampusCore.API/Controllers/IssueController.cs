using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/issue")]
    [ApiController]
    public class IssueController : Controller
    {
        private IIssueService _issueService;

        public IssueController(IIssueService issueService)
        {
            _issueService = issueService;
        }

        // /api/issue/create
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(IssueAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.CreateIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/issue/getAllBySubmission
        //insert method here
        [HttpPost("getAllBySubmission")]
        public async Task<IActionResult> GetAllBySubmission(IssueGetAllModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.GetAllBySubmissionAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/issue/getAllByUser
        //insert method here
        [HttpPost("getAllByUser")]
        public async Task<IActionResult> GetAllByUser(IssueGetAllModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.GetAllByUserAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }



        //api/Issue/search
        [HttpPost("search")]
        public async Task<IActionResult> SearchIssueAsync(StringSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.SearchIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        //api/issue/getById
        [HttpPost("getById")]
        public async Task<IActionResult> IssueGetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.IssueGetByIdAsync(model);

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

                var result = await _issueService.DeleteIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/issue/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] IssueUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.UpdateIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
