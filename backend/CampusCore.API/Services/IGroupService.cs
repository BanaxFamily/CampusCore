using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    public interface IGroupService
    {
        Task<ResponseManager> CreateAsync(GroupAddViewModel model);
        Task<ResponseManager> GetAllAsync();
        Task<ResponseManager> GetAllByCourseAsync(IntIdViewModel model);
        Task<ResponseManager> GetAllByStudentAsync(StringIdViewModel model);
        Task<ResponseManager> GetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> GetMembersAsync(IntIdViewModel model);
        Task<ResponseManager> DeleteAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateDetailsAsync(GroupUpdateDetailsViewModel model);
        Task<ResponseManager> UpdateMembersAsync(GroupUpdateMembersViewModel model);
        Task<ResponseManager> UpdateStatusAsync(GroupUpdateStatusViewModel model);
    }

    public class GroupService : IGroupService
    {
        private AppDbContext _context;

        public GroupService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateAsync(GroupAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var group = new Group
            {
                Name = model.Name,
                AdviserId = model.AdviserId,
                Status = "active",
                OfferedCourseId = model.OfferedCourseId
            };


            _context.Groups.Add(group);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                //adding each member to student group table
                foreach (var memberId in model.Members)
                {
                    _context.StudentGroups.Add(new StudentGroup
                    {
                        GroupId = group.Id,
                        StudentId = memberId
                    });
                }
                var res = await _context.SaveChangesAsync();
                if(res > 0)
                {
                    return new ResponseManager
                    {
                        Message = "Group created and members added successfully!",
                        IsSuccess = true
                    };
                }
                return new ErrorResponseManager
                {
                    Message = "Group is created but members are not added",
                    IsSuccess = false,
                    Errors = new List<string>() { "Error adding members in student group table in DB" }
                };


            }

            return new ErrorResponseManager
            {
                Message = "Group is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error creating group in DB" }
            };
        }

        public async Task<ResponseManager> DeleteAsync(IntIdViewModel model)
        {
            var groupId = model.Id;
            if (model == null)
                throw new NullReferenceException("Register Model is null");

            try
            {
                //remove all associations of members and group in student group table
                var studentGroup = await _context.StudentGroups
                                           .Where(sg => sg.GroupId == groupId)
                                           .ToListAsync();
                foreach (var item in studentGroup)
                {
                    _context.StudentGroups.Remove(item);
                }
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    //then remove group from group table
                    var group = _context.Groups.Find(groupId);
                    _context.Groups.Remove(group);

                    var res = await _context.SaveChangesAsync();
                    if (res > 0)
                    {
                        return new ResponseManager
                        {
                            Message = "Group deleted successfully!",
                            IsSuccess = true
                        };
                    }
                    return new ErrorResponseManager
                    {
                        Message = "Group association in student group is removed but group is not deleted",
                        IsSuccess = false,
                        Errors = new List<string>() { "Error deleting in group table in DB" }
                    };


                }

                return new ErrorResponseManager
                {
                    Message = "Error removing association of group to members in student group",
                    IsSuccess = false,
                    Errors = new List<string>() { "Error removing group in student group DB" }
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the group",
                    Errors = new List<string> { ex.Message }
                };
            }
            
        }

        //need to check if returns the correct data
        public async Task<ResponseManager> GetAllAsync()
        {
            try
            {
                var result = await _context.StudentGroups
                                            .Include(sg => sg.Student.FullName)
                                            .Include(sg => sg.Student.Id)
                                            .Include(sg => sg.Student.Idno)
                                            .Include(sg => sg.Group)
                                            .Select(sg => sg.Group)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "groups retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching groups in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllByCourseAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.StudentGroups
                                            .Include(sg => sg.Student.FullName)
                                            .Include(sg => sg.Student.Id)
                                            .Include(sg => sg.Student.Idno)
                                            .Include(sg => sg.Group)
                                            .Select(sg => sg.Group)
                                            .Where(g=> g.OfferedCourseId == model.Id)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"groups of offered course {model.Id} retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching groups in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllByStudentAsync(StringIdViewModel model)
        {
            try
            {
                var result = await _context.StudentGroups
                                            .Where(g => g.StudentId == model.Id)
                                            .Include(sg => sg.Student.FullName)
                                            .Include(sg => sg.Student.Id)
                                            .Include(sg => sg.Student.Idno)
                                            .Include(sg=> sg.Group)
                                            .Select(sg => sg.Group)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"groups of student {model.Id} retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching groups in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetByIdAsync(IntIdViewModel model)
        {
            try
            {
                var result = await _context.Groups.FindAsync(model.Id);

                if(result == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "Group with that id does not exist",
                        Errors = new List<string> { "Cannot find group with that id in DB" }
                    };
                }    
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"{model.Id} retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching groups in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetMembersAsync(IntIdViewModel model)
        {

            try
            {
                var result = await _context.StudentGroups
                                            .Where(g => g.GroupId == model.Id)
                                            .Include(sg => sg.Student.FullName)
                                            .Include(sg => sg.Student.Id)
                                            .Include(sg => sg.Student.Idno)
                                            .Select(sg => sg.Student)
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"members of group {model.Id} retrieved successfully",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching group members in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateDetailsAsync(GroupUpdateDetailsViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var group = await _context.Groups.FindAsync(model.Id);

            group.Name = model.Name;
            group.AdviserId = model.AdviserId;


            _context.Groups.Update(group);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Group updated successfully",
                    IsSuccess = true
                };

            }

            return new ErrorResponseManager
            {
                Message = "Group is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error creating group in DB" }
            };
        }

        public async Task<ResponseManager> UpdateMembersAsync(GroupUpdateMembersViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");
            var membersInDb = _context.StudentGroups
                                      .Where(sg => sg.GroupId == model.Id)
                                      .Select(sg=>sg.Student.Id)
                                      .ToList();
            var updatedMembers = model.Members;

            //checking members to be added
            var toAddMembers = updatedMembers.Except(membersInDb).ToList();

            //checking members to be removed
            var toRemoveMembers = membersInDb.Except(updatedMembers).ToList();

            if (toAddMembers.Any() || toRemoveMembers.Any())
            {
                try
                {
                    foreach (var memberId in toAddMembers)
                    {
                        _context.StudentGroups.Add(new StudentGroup
                        {
                            GroupId = model.Id,
                            StudentId = memberId
                        });
                    }
                    _context.SaveChangesAsync();

                    foreach (var memberId in toRemoveMembers)
                    {
                        var member = _context.StudentGroups
                                             .Where(sg => sg.StudentId == memberId)
                                             .FirstOrDefault();
                        if (member == null)
                        {
                            return new ErrorResponseManager
                            {
                                Message = "Member not found",
                                IsSuccess = false,
                                Errors = new List<string>() { $"Member {memberId} is not found in  DB" }
                            };
                        }
                        _context.StudentGroups.Remove(member);

                    }
                    await _context.SaveChangesAsync();
                }
                catch(Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        Message = "Error updating members",
                        IsSuccess = false,
                        Errors = new List<string> { ex.Message }
                    };
                }
             
            }
            
            return new ErrorResponseManager
            {
                Message = "Group is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error creating group in DB" }
            };
        }

        public async Task<ResponseManager> UpdateStatusAsync(GroupUpdateStatusViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var group = await _context.Groups.FindAsync(model.Id);

            group.Status = model.Status;


            _context.Groups.Update(group);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Status is updated",
                    IsSuccess = true
                };

            }

            return new ErrorResponseManager
            {
                Message = "Group is not created",
                IsSuccess = false,
                Errors = new List<string>() { "Error creating group in DB" }
            };
        }
    }
}
