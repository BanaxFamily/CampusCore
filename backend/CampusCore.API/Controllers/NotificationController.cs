using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/notification")]
    [ApiController]
    public class NotificationController : Controller
    {
        private INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // /api/notification/add
        [HttpPost("add")]
        public async Task<IActionResult> CreateAsync(NotificationAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _notificationService.CreateNotificationAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/notification/viewList
        //insert method here
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync(NotificationListViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _notificationService.ViewNotificationListAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(NotificationDeleteModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _notificationService.DeleteNotificationAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        // /api/notification/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] NotificationUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _notificationService.UpdateNotificationAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }
    }
}
