using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/publicResearchRepository")]
    [ApiController]
    public class PublicResearchRepositoryController : Controller
    {
        private IPublicResearchRepositoryService _publicResearchRepositoryService;

        public PublicResearchRepositoryController(IPublicResearchRepositoryService publicResearchRepositoryService)
        {
            _publicResearchRepositoryService = publicResearchRepositoryService;
        }

        // /api/publicResearchRepository/create
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(PublicResearchRepositoryAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.CreatePublicResearchRepositoryAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/publicResearchRepository/viewList
        //insert method here
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.ViewPublicResearchRepositoryListAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //[HttpGet("getAllOpen")]
        //public async Task<IActionResult> ViewListOpenAsync()
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = await _publicResearchRepositoryService.ViewPublicResearchRepositoryListAsync();

        //        if (result.IsSuccess)
        //            return Ok(result); //Status code: 200

        //        return BadRequest(result);
        //    }
        //    return BadRequest("Some properties are not valid"); //status code: 400
        //}

        //api/publicResearchRepository/search
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


        //api/publicResearchRepository/search
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

        // /api/publicResearchRepository/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] PublicResearchRepositoryUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.UpdatePublicResearchRepositoryAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }


    }
}
