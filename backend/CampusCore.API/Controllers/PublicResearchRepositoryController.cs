using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/repository")]
    [ApiController]
    public class PublicResearchRepositoryController : Controller
    {
        private IPublicResearchRepositoryService _publicResearchRepositoryService;

        public PublicResearchRepositoryController(IPublicResearchRepositoryService publicResearchRepositoryService)
        {
            _publicResearchRepositoryService = publicResearchRepositoryService;
        }

        // /api/repository/create
        [Authorize(Roles = "Faculty,Student")]
        [HttpPost("requestUpload")]
        public async Task<IActionResult> CreateAsync(PublicResearchRepositoryAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.RequestUploadAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/repository/getAll
        [Authorize(Roles = "Dean")]
        [HttpGet("getAll")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.GetAllAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/repository/getAllPublished
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpGet("getAllPublished")]
        public async Task<IActionResult> ListPublishedAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.ListPublishedAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        //api/repository/getAllRequest
        [Authorize(Roles = "Dean")]
        [HttpGet("getAllRequest")]
        public async Task<IActionResult> ListRequestAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.ListRequestAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        //api/repository/search
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(StringSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.SearchPublicResearchRepositoryAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        //api/repository/getById
        [Authorize(Roles = "Admin,Dean,Faculty,Student,PRC")]
        [HttpPost("getById")]
        public async Task<IActionResult> PublicResearchRepositoryGetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.PublicResearchRepositoryGetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _publicResearchRepositoryService.DeletePublicResearchRepositoryAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        //api/repository/approveResearch
        [Authorize(Roles = "Dean")]
        [HttpPost("approveResearch")]
        public async Task<IActionResult> ApproveAsync(PublicResearchRepositoryApproveViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.ApproveAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        



    }
}
