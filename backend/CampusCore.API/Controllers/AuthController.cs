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
        public AuthController (IUserService userService)
        {
            _userService = userService;
        }

       
        // /api/auth/add
        [HttpPost("add")]
        public async Task<IActionResult> UserAddAsync(UserAddViewModel model)
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

        // /api/auth/login
        [HttpPost ("login")]
        public async Task<IActionResult> LoginAsync(UserLoginViewModel model)
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

        
    }
}
