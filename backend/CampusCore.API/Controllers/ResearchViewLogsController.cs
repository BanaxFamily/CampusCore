using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/viewlogs")]
    [ApiController]
    public class ResearchViewLogsController : Controller
    {
        private IPublicResearchRepositoryService _publicResearchRepositoryService;

        public ResearchViewLogsController(IPublicResearchRepositoryService publicResearchRepositoryService)
        {
            _publicResearchRepositoryService = publicResearchRepositoryService;
        }

        //ViewLogs
        //api/repository/addViewLog
        [HttpPost("addViewLog")]
        public async Task<IActionResult> AddViewLogAsync(ResearchViewLogAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.AddViewLogAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        [HttpPost("getByResearch")]
        public async Task<IActionResult> GetViewLogsByResearchAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.GetViewLogsByResearchAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpPost("getByUser")]
        public async Task<IActionResult> GetViewLogsByUserAsync(StringIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _publicResearchRepositoryService.GetViewLogsByUserAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
    }
}
