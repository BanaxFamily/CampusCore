using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace CampusCore.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }


        // /api/auth/add
        [HttpPost("add")]
        public async Task<IActionResult> UserAddAsync([FromBody] UserAddViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.UserAddAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        [HttpGet("viewList")]
        public async Task<IActionResult> ViewListAsync()
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.UserListAllAsync();

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        [HttpPost("search")]
        public async Task<IActionResult> ViewListSearchAsync(UserListSearchViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.UserSearchAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid"); //status code: 400
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAsync([FromBody] StringIdViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _userService.UserDeleteAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for delete"); //status code: 400
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] UserUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _userService.UserUpdateAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); //status code: 400
        }

        [HttpPut("updateDetails")]
        public async Task<IActionResult> UpdateDetailsAsync([FromBody] UpdateDetailsViewModel model)
        {
            if (ModelState.IsValid)
            {

                var result = await _userService.UpdateDetailsAsync(model);

                if (result.IsSuccess)
                    return Ok(result); //Status code: 200

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid for update"); //status code: 400
        }


        // /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.LoginAsync(model);
                if (result.IsSuccess)
                    return Ok(result);
                return BadRequest(result);

            }
            return BadRequest("Some properties are not valid");
        }

        // /api/auth/logout
        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.LogoutAsync(id);
                if (result.IsSuccess)
                    return Ok(result);
                return BadRequest(result);

            }
            return BadRequest("Some properties are not valid");
        }

        // api/auth/getById
        [HttpPost("getById")]
        public async Task<IActionResult> GetByIdAsync(StringIdViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.UserGetByIdAsync(model);
                if (result.IsSuccess)
                    return Ok(result);
                return BadRequest(result);

            }
            return BadRequest("Some properties are not valid");
        }
        // api/auth/getByRole
        [HttpPost("getByRole")]
        public async Task<IActionResult> UserListByRoleAsync(UserGetByRoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.UserListByRoleAsync(model);
                if (result.IsSuccess)
                    return Ok(result);
                return BadRequest(result);

            }
            return BadRequest("Some properties are not valid");
        }

        [HttpPost("updatePassword")]
        public async Task<IActionResult> UpdatePasswordAsync(UpdatePasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.UpdatePasswordAsync(model);
                if (result.IsSuccess)
                    return Ok(result);
                return BadRequest(result);

            }
            return BadRequest("Some properties are not valid");
        }



    }
}