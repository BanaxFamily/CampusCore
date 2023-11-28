using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CampusCore.API.Controllers
{
    [Route("api/group")]
    [ApiController]
    public class GroupController:Controller
    {
        private IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }
        
        // /api/group/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync(GroupAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.CreateAsync(model)
;

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/group/getAllByStudent
        [HttpPost("getAllByStudent")]
        public async Task<IActionResult> GetAllByStudentAsync(StringIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.GetAllByStudentAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        // /api/group/getAllByCourse
        [HttpPost("getAllByCourse")]
        public async Task<IActionResult> GetAllByCourseAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.GetAllByCourseAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }


        //api/group/search
        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(StringSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.SearchAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/group/getAll
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.GetAllAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/group/getById
        [HttpPost("getById")]
        public async Task<IActionResult> GroupGetByIdAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.GetByIdAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/group/getMembers
        [HttpPost("getMembers")]
        public async Task<IActionResult> GetMembersAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.GetMembersAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }

        //api/group/delete
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _groupService.DeleteAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        //For updating group name or adviser
        // /api/group/updateDetails
        [HttpPut("updateDetails")]
        public async Task<IActionResult> UpdateDetailsAsync(GroupUpdateDetailsViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.UpdateDetailsAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //For updating group members in a group (give array of student id for updated members)
        // /api/group/updateMembers
        [HttpPut("updateMembers")]
        public async Task<IActionResult> UpdateMembersAsync(GroupUpdateMembersViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.UpdateMembersAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        //for updating group status such as "active", "dissolved"
        // /api/group/update
        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateStatusAsync(GroupUpdateStatusViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.UpdateStatusAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

        [HttpPost("getNoGroupStudents")]
        public async Task<IActionResult> GetStudentsWithNoGroup(IntIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _groupService.GetStudentsWithNoGroup(model);

                if (result.IsSuccess)
                    return Ok(result); // Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); // Status code: 400
        }

    }
}
