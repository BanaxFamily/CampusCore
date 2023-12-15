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


        //// /api/Issue/viewList
        ////insert method here
        //[HttpGet("viewList")]
        //public async Task<IActionResult> ViewListAsync()
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = await _issueService.ViewIssueListAsync();

        //        if (result.IsSuccess)
        //            return Ok(result); //Status code: 200

        //        return BadRequest(result);
        //    }
        //    return BadRequest("Some properties are not valid"); //status code: 400
        //}

        // /api/issue/getAllBySubmission
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
        /*[HttpPost("getAllByUser")]
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
        }*/

        
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
        [HttpPut("close")]
        public async Task<IActionResult> CloseIssueAsync([FromBody]CloseIssueViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _issueService.CloseIssueAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
