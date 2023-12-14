using CampusCore.API.Models;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OfficeOpenXml;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CampusCore.API.Services
{
    public interface IUserService
    {
        Task<ResponseManager> UserAddAsync(UserAddViewModel model);
        Task<ResponseManager> UserSearchAsync(UserListSearchViewModel model);
        Task<ResponseManager> UserListAllAsync();
        Task<ResponseManager> UserListByRoleAsync(UserGetByRoleViewModel model);
        Task<ResponseManager> UserUpdateAsync(UserUpdateViewModel model);
        Task<ResponseManager> UserDeleteAsync(StringIdViewModel model);
        Task<ResponseManager> LoginAsync(UserLoginViewModel model);
        Task<ResponseManager> UserGetByIdAsync(StringIdViewModel model);
        Task<ResponseManager> UpdateDetailsAsync(UpdateDetailsViewModel model);
        Task<ResponseManager> UpdatePasswordAsync(UpdatePasswordViewModel model);
        Task<ResponseManager> LogoutAsync(string userId);
        Task<ResponseManager> ImportUsers(ExcelImportViewModel model);


    }
}

public class KeyGeneratorStorage
{
    public static byte[] GeneratePrivateKey(string password, byte[] salt, int iterations, int keyLength)
    {
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations))
        {
            return pbkdf2.GetBytes(keyLength);
        }
    }
    public static byte[] GenerateRandomSalt()
    {
        byte[] salt = new byte[16]; // 16 bytes is a common size for salt
        using (var rng = new RNGCryptoServiceProvider())
        {
            rng.GetBytes(salt);
        }
        return salt;
    }

    public static byte[] EncryptPrivateKey(byte[] privateKey, byte[] key, byte[] iv)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = key;
            aesAlg.IV = iv;

            // Create an encryptor to perform the stream transform.
            ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

            // Create the streams used for encryption.
            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    csEncrypt.Write(privateKey, 0, privateKey.Length);
                    csEncrypt.FlushFinalBlock();
                    return msEncrypt.ToArray();
                }
            }
        }
    }
    public static byte[] DecryptPrivateKey(byte[] encryptedPrivateKey, byte[] key, byte[] iv)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = key;
            aesAlg.IV = iv;

            // Create a decryptor to perform the stream transform.
            ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

            // Create the streams used for decryption.
            using (MemoryStream msDecrypt = new MemoryStream(encryptedPrivateKey))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (MemoryStream msResult = new MemoryStream())
                    {
                        csDecrypt.CopyTo(msResult);
                        return msResult.ToArray();
                    }
                }
            }
        }
    }
}

public class UserService : IUserService
{
    private UserManager<User> _userManager;
    private IConfiguration _configuration;
    private AppDbContext _context;
    private string _uploadPath;

    public UserService(UserManager<User> userManager, IConfiguration configuration, AppDbContext context)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;

        // Get the root directory of your application
        var currentDirectory = Directory.GetCurrentDirectory();
        var goUp = Directory.GetParent(currentDirectory);
        var goUp2 = Directory.GetParent(goUp.ToString());
        var basePath = goUp2.ToString();

        // Combine it with the 'User_Imports' directory
        _uploadPath = Path.Combine(basePath.ToString(), "User_Imports");

        // Check if the directory exists; create it if not
        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
        }

    }




    public async Task<ResponseManager> LoginAsync(UserLoginViewModel model)
    {
        if (model == null)
            throw new NullReferenceException("Login Model is null");
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
        {
            return new ResponseManager
            {
                Message = "No user found",
                IsSuccess = false
            };
        }
        var result = await _userManager.CheckPasswordAsync(user, model.Password);



        if (!result)
        {
            return new ErrorResponseManager
            {
                Message = "Invalid login",
                IsSuccess = false,
                Errors = new List<string>() { "Invalid login credentials" }
            };
        }

        try
        {
            var userRole = await _userManager.GetRolesAsync(user);
            var claims = new[]
            {
            new Claim("Username", model.Username),
            new Claim(ClaimTypes.NameIdentifier,user.Id),
            new Claim(ClaimTypes.Role, userRole.FirstOrDefault())

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["AuthSettings:Issuer"],
                audience: _configuration["AuthSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            _context.UserLogs.Add(new UserLog
            {
                UserId = user.Id,
                Log = DateTime.Now,
                Action = "login"
            });
            _context.SaveChanges();


            return new LoginResponseManager
            {
                Token = tokenAsString,
                IsSuccess = true,
                Message = "Successfully logged in"
            };

        }
        catch
        {
            return new ErrorResponseManager
            {
                Message = "Something went wrong",
                IsSuccess = false,
                Errors = new List<string>() { "Token creation error" }
            };
        }







    }
    [HttpPost("logout")]
    public async Task<ResponseManager> LogoutAsync(string userId)
    {

        _context.UserLogs.Add(new UserLog
        {
            UserId = userId,
            Log = DateTime.Now,
            Action = "login"
        });

        return new ResponseManager
        {
            Message = "Logout successful",
            IsSuccess = true
        };
    }

    public async Task<ResponseManager> UserAddAsync(UserAddViewModel model)
    {
        if (model == null)
            throw new NullReferenceException("Register Model is null");

        if (model.Password != model.RePassword)
            return new ResponseManager
            {
                Message = "Confirm password does not match the password",
                IsSuccess = false
            };

        var encryption = _context.EncryptionKeys.FirstOrDefault();

        var privateKey = KeyGeneratorStorage.GeneratePrivateKey(model.Password, KeyGeneratorStorage.GenerateRandomSalt(), 10000, 32);
        var user = new User
        {
            Idno = model.Idno,
            Email = model.Email,
            UserName = model.Username,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Status = model.Status,
            EncryptedPrivateKey = KeyGeneratorStorage.EncryptPrivateKey(privateKey, encryption.Key, encryption.Iv)

        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, model.Role);
            return new ResponseManager
            {
                Message = "User created successfully!",
                IsSuccess = true
            };

        }
        return new ErrorResponseManager
        {
            Message = "User is not created",
            IsSuccess = false,
            Errors = result.Errors.Select(e => e.Description)
        };


    }

    public async Task<ResponseManager> ImportUsers(ExcelImportViewModel model)
    {
        if (model == null)
            throw new NullReferenceException("Register Model is null");

        //process File and copy to path
        if (model.ImportFile == null || model.ImportFile.Length <= 0)
        {
            return new ErrorResponseManager
            {
                Message = "Something wrong occured while adding the file",
                IsSuccess = false,
                Errors = new List<string>() { "Error extracting file content" }
            };

        }

        try
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.ImportFile.FileName);
            var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.ImportFile.CopyToAsync(fileStream);
            }

            List<User> users = new List<User>();
            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                var worksheet = package.Workbook.Worksheets[0]; // Assuming the data is in the first worksheet

                for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                {
                    try
                    {
                        if (worksheet.Cells[row, 1, row, 4].All(cell => cell.Value != null && cell.Value.ToString().Trim() != ""))
                        {

                            //get data from row
                            var firstName = worksheet.Cells[row, 1].Value.ToString();
                            var lastName = worksheet.Cells[row, 2].Value.ToString();
                            var idno = worksheet.Cells[row, 3].Value.ToString();
                            var email = worksheet.Cells[row, 4].Value.ToString();
                            var username = "ccs-" + idno;
                            var password = lastName + idno.Substring(idno.Length - 4)+"!";
                            var role = worksheet.Cells[row, 5].Value.ToString();

                            //digital signature
                            var encryption = _context.EncryptionKeys.FirstOrDefault();
                            var privateKey = KeyGeneratorStorage.GeneratePrivateKey(password, KeyGeneratorStorage.GenerateRandomSalt(), 10000, 32);

                            var user = new User
                            {
                                Idno = idno,
                                Email = email,
                                UserName = username,
                                FirstName = firstName,
                                LastName = lastName,
                                
                                EncryptedPrivateKey = KeyGeneratorStorage.EncryptPrivateKey(privateKey, encryption.Key, encryption.Iv)

                            };

                            var result = await _userManager.CreateAsync(user, password);

                            if (result.Succeeded)
                            {
                                try
                                {
                                    await _userManager.AddToRoleAsync(user, role);
                                }
                                catch(Exception ex) 
                                {
                                    return new ErrorResponseManager
                                    {
                                        Message = $"Importing users is interrupted. Row {row} cannot be added to specified role.",
                                        IsSuccess = false,
                                        Errors = new List<string>() { "Error extracting file content" }
                                    };
                                }
                                
                                 
                            }


                        }
                        else
                        {
                            return new ErrorResponseManager
                            {
                                Message = $"Importing users is interrupted. Row {row} does not have complete data.",
                                IsSuccess = false,
                                Errors = new List<string>() { "Error extracting file content" }
                            };
                        }

                    }
                    catch (Exception ex)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Something wrong occured while importing the users",
                            IsSuccess = false,
                            Errors = new List<string>() { ex.Message }
                        };
                    }

                }
                return new ResponseManager
                {
                    Message = "Users imported successfully!",
                    IsSuccess = true
                };
            }
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                Message = "Something wrong occured while adding the file",
                IsSuccess = false,
                Errors = new List<string>() { ex.Message }
            };
        }




    }

    public async Task<ResponseManager> UserDeleteAsync(StringIdViewModel model)
    {
        try
        {
            var deleteUser = await _userManager.FindByIdAsync(model.Id);


            if (deleteUser == null)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "user not found",
                    Errors = new List<string> { "User with the specified ID does not exist" }
                };
            }
            try
            {
                await _userManager.DeleteAsync(deleteUser);
                return new ResponseManager
                {
                    IsSuccess = true,
                    Message = "User deleted successfully"
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the user",
                    Errors = new List<string> { ex.Message }
                };
            }


        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while deleting the user",
                Errors = new List<string> { ex.Message }
            };
        }
    }

    public async Task<ResponseManager> UserListAllAsync()
    {
        try
        {
            var result = new List<UserListViewModel>(); // Adding this model just to have it in a nice list.
            var users = _userManager.Users;

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                {
                    result.Add(new UserListViewModel
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Status = user.Status,
                        Idno = user.Idno,
                        Role = string.Join(", ", roles)
                    });
                }
            }

            return new DataResponseManager
            {
                IsSuccess = true,
                Message = "Users retrieved successfully",
                Data = result
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while fetching users",
                Errors = new List<string> { ex.Message }
            };
        }
    }

    public async Task<ResponseManager> UserSearchAsync(UserListSearchViewModel model)
    {
        string searchKey = model.SearchKey;
        string option = model.Option;


        try
        {
            List<User> searchResults = null;

            if (option == "Name")
            {
                searchResults = await _userManager.Users
                                     .Where(oc => EF.Functions.Like(oc.FullName, $"%{model.SearchKey}%"))
                                     .ToListAsync();
            }
            else if (option == "Username")
            {
                searchResults = await _userManager.Users
                                     .Where(oc => EF.Functions.Like(oc.UserName, $"%{model.SearchKey}%"))
                                     .ToListAsync();
            }
            else if (option == "Id")
            {
                searchResults = await _userManager.Users
                                     .Where(oc => EF.Functions.Like(oc.Idno, $"%{model.SearchKey}%"))
                                     .ToListAsync();
            }




            return new DataResponseManager
            {
                IsSuccess = true,
                Message = "users retrieved successfully",
                Data = searchResults
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while fetching users",
                Errors = new List<string> { ex.Message }
            };
        }

    }

    //method to get user by id ("id" means id in database)

    public async Task<ResponseManager> UserGetByIdAsync(StringIdViewModel model)
    {
        try
        {

            var users = await _userManager.FindByIdAsync(model.Id);
            var role = await _userManager.GetRolesAsync(users);
            var data = new
            {
                user = users,
                roles = role
            };


            return new DataResponseManager
            {
                IsSuccess = true,
                Message = "User retrieved successfully",
                Data = data
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while fetching user",
                Errors = new List<string> { ex.Message }
            };
        }

    }
    public async Task<ResponseManager> UserListByRoleAsync(UserGetByRoleViewModel model)
    {
        var role = model.Role;
        try
        {

            var searchResults = await _userManager.GetUsersInRoleAsync(role);


            if (searchResults.Count > 0)
            {
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"Users with {role} role retrieved successfully",
                    Data = searchResults
                };
            }
            return new ErrorResponseManager
            {
                IsSuccess = true,
                Message = $"There are no users with {role} role"
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = $" Error fetching users in {role} role",
                Errors = new List<string> { ex.Message }
            };
        }
    }


    public async Task<ResponseManager> UserUpdateAsync(UserUpdateViewModel model)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            var userRole = await _userManager.GetRolesAsync(user);

            if (user == null)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "user not found",
                    Errors = new List<string> { "user with the specified ID does not exist" }

                };
            }

            // Update the user properties from the model

            user.Email = model.Email;
            user.UserName = model.Username;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Status = model.Status;


            if (!userRole.Contains(model.Role))
            {
                await _userManager.RemoveFromRoleAsync(user, userRole.First());
                await _userManager.AddToRoleAsync(user, model.Role);
            }


            // Save changes to the database
            await _userManager.UpdateAsync(user);

            return new ResponseManager
            {
                IsSuccess = true,
                Message = "user updated successfully"
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while updating the user",
                Errors = new List<string> { ex.Message }
            };
        }
    }

    public async Task<ResponseManager> UpdateDetailsAsync(UpdateDetailsViewModel model)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(model.Id);

            if (user == null)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "user not found",
                    Errors = new List<string> { "user with the specified ID does not exist" }

                };
            }

            //Update the user properties from the model

            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;



            //Save changes to the database
            await _userManager.UpdateAsync(user);

            return new ResponseManager
            {
                IsSuccess = true,
                Message = "user updated successfully"
            };
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while updating the user",
                Errors = new List<string> { ex.Message }
            };
        }
    }

    public async Task<ResponseManager> UpdatePasswordAsync(UpdatePasswordViewModel model)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while updating the user",
                    Errors = new List<string> { "User not found" }
                }; ;
            }

            var result = await _userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);

            if (result.Succeeded)
            {
                return new ResponseManager
                { IsSuccess = true, Message = "Password changed successfully" };
            }
            else
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "Failed to change password",
                    Errors = result.Errors.Select(error => error.Description).ToList()
                };
            }
        }
        catch (Exception ex)
        {
            return new ErrorResponseManager
            {
                IsSuccess = false,
                Message = "An error occurred while updating the user",
                Errors = new List<string> { ex.Message }
            };
        }
    }



    //public async Task<ResponseManager> UpdatePasswordAsync(UpdatePasswordViewModel model)
    //{
    //    try
    //    {
    //        var user = await _userManager.FindByIdAsync(model.Id);

    //        if (user == null)
    //        {
    //            return new ErrorResponseManager
    //            {
    //                IsSuccess = false,
    //                Message = "user not found",
    //                Errors = new List<string> { "user with the specified ID does not exist" }

    //            };
    //        }

    //        // Update the user properties from the model
    //        user.Email = model.Email;
    //        user.PhoneNumber = model.PhoneNumber;



    //        // Save changes to the database
    //        await _userManager.UpdateAsync(user);

    //        return new ResponseManager
    //        {
    //            IsSuccess = true,
    //            Message = "user updated successfully"
    //        };
    //    }
    //    catch (Exception ex)
    //    {
    //        return new ErrorResponseManager
    //        {
    //            IsSuccess = false,
    //            Message = "An error occurred while updating the user",
    //            Errors = new List<string> { ex.Message }
    //        };
    //    }
    //}
}