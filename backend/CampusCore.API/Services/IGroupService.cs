﻿using CampusCore.API.Models;
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
        Task<ResponseManager> TransferAdviserAccess(TransferAdviserAccessViewModel model);
        Task<ResponseManager> UpdateMembersAsync(GroupUpdateMembersViewModel model);
        Task<ResponseManager> UpdateStatusAsync(GroupUpdateStatusViewModel model);
        Task<ResponseManager> GetStudentsWithNoGroup( IntIdViewModel model);
        Task<ResponseManager> GetStudentsForUpdate(GetStudentsForUpdateViewModel model);
        Task<ResponseManager> GetGroupOfStudent(GetGroupOfStudentViewModel model);
        Task<ResponseManager> SearchAsync(StringSearchViewModel model);//group name
        Task<ResponseManager> GetAllAdvisoreeSubmissions(StringIdViewModel model);//group name
        Task<ResponseManager> GetAllResearchTeams();//used by dean side to list all research teams
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
                LeaderId = model.LeaderId,
                Status = "active",
                OfferedCourseId = model.OfferedCourseId,
                IsRetainable = model.IsRetainable
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
                var result = await _context.Groups
                                            .Select(sg => new {
                                                GroupId = sg.Id,
                                                AdviserId = sg.AdviserId,
                                                Adviser = sg.Adviser.FullName,
                                                GroupName = sg.Name,
                                            })
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
                var result = await _context.Groups
                                            .Where(g=> g.OfferedCourseId == model.Id)
                                            .Select(sg => new {
                                                GroupId = sg.Id,
                                                AdviserId = sg.AdviserId,
                                                Adviser = sg.Adviser.FullName,
                                                GroupName = sg.Name,
                                            })
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
                                            .Select(sg => new {
                                                GroupId = sg.GroupId,
                                                Adviser = sg.Group.Adviser.FullName,
                                                GroupName = sg.Group.Name,
                                            })
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
                var sg = await _context.Groups.FindAsync(model.Id);
               
                if (sg == null)
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
                    Data = new
                    {
                        GroupId = sg.Id,
                        AdviserId = sg.AdviserId,
                        Adviser = sg.Adviser.FullName,
                        GroupName = sg.Name,
                    }
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
                

                var leaderId = _context.StudentGroups
                                            .Where(g => g.GroupId == model.Id)
                                            .Select(sg => new String(sg.Group.LeaderId)).FirstOrDefault();

                var result = await _context.StudentGroups
                                            .Where(g => g.GroupId == model.Id)
                                            .Select(sg => new {
                                                StudentId = sg.StudentId,
                                                StudentIdno = sg.Student.Idno,
                                                StudentName = sg.Student.FullName,
                                                IsLeader = sg.StudentId == leaderId? true : false
                                            })
                                            .ToListAsync();
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"members of group {model.Id} retrieved successfully",
                    Data = new
                    {
                        Members = result
                    }
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


            var group = await _context.Groups.FindAsync(model.GroupId);

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
                                      .Where(sg => sg.GroupId == model.GroupId)
                                      .Select(sg=> new string(sg.StudentId))
                                      .ToArray();
            
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
                            GroupId = model.GroupId,
                            StudentId = memberId
                        });
                    }
                    await _context.SaveChangesAsync();

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
                    //update leader
                    var group = await _context.Groups.FindAsync(model.GroupId);
                    if (group == null)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Error updating leader",
                            IsSuccess = false,
                            Errors = new List<string> { "Group not found in DB"}
                        };
                    }
                    group.LeaderId = model.LeaderId;
                    _context.Groups.Update(group);

                    await _context.SaveChangesAsync();
                    return new ResponseManager
                    {
                        Message = "Group members updated successfully",
                        IsSuccess = true
                    };
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
            return new ResponseManager
            {
                Message = "No member changes found",
                IsSuccess = true
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

        public async Task<ResponseManager> SearchAsync(StringSearchViewModel model)
        {
            string searchKey = model.SearchKey;

            try
            {

                var searchResults = await _context.Groups
                    .Where(oc => EF.Functions.Like(oc.Name, $"%{searchKey}%"))
                    .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched group retrieved successfully",
                    Data = searchResults
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching searched group",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetStudentsWithNoGroup(IntIdViewModel model)
        {
            try
            {
                var studentWithGroups = await _context.StudentGroups
                                            .Where(g => g.Group.OfferedCourseId == model.Id)
                                            .Select(sg => new
                                            {
                                                StudentId = sg.StudentId,
                                                StudentIdno = sg.Student.Idno,
                                                StudentName = sg.Student.FullName
                                            })
                                            .ToListAsync();

                var enrolledStudents = await _context.CourseEnrollments
                                           .Where(ce => ce.OfferedCourseId == model.Id)
                                           .Select(sg => new
                                           {
                                               StudentId = sg.StudentId,
                                               StudentIdno = sg.Student.Idno,
                                               StudentName = sg.Student.FullName
                                           })
                                           .ToListAsync();
                //checking members to be removed
                var noGroupStudents = enrolledStudents.Except(studentWithGroups).ToList();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"groups of offered course {model.Id} retrieved successfully",
                    Data = noGroupStudents
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


        public async Task<ResponseManager> GetStudentsForUpdate(GetStudentsForUpdateViewModel model)
        {
            var groupId = model.GroupId;
            var offeredCourseId = model.OfferedCourseId;


            try
            {
                var leaderId = _context.StudentGroups
                                            .Where(g => g.GroupId == groupId)
                                            .Select(sg => new String(sg.Group.LeaderId)).FirstOrDefault();

                var members = await _context.StudentGroups
                                            .Where(g => g.GroupId == groupId)
                                            .Select(sg => new String(sg.StudentId)
                                            )
                                            .ToListAsync();

                var enrolledStudents = await _context.CourseEnrollments
                                           .Where(ce => ce.OfferedCourseId == offeredCourseId)
                                           .Select(sg => new
                                           {
                                               StudentId = sg.StudentId,
                                               StudentIdno = sg.Student.Idno,
                                               StudentName = sg.Student.FullName,
                                               IsLeader = sg.StudentId == leaderId ? true : false,
                                               IsMember = members.Contains(sg.StudentId) ? true : false
                                           })
                                           .ToListAsync();
                

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"students of offered course {groupId} retrieved successfully",
                    Data = enrolledStudents
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching students of offered course in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetGroupOfStudent(GetGroupOfStudentViewModel model)
        {
            var studentId = model.StudentId;

           

            try
            {
                var groupId =  await _context.StudentGroups
                                            .Where(g => g.StudentId == studentId)
                                            .Select(sg => new
                                            {
                                                StudentGroupId = sg.GroupId
                                            }).FirstOrDefaultAsync();
                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"students of offered course {groupId} retrieved successfully",
                    Data = groupId
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching students of offered course in DB",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllAdvisoreeSubmissions(StringIdViewModel model)
        {
            try
            {
                var result = await _context.CourseDeliverableSubmissions
                                            .Where(g =>g.Submission.Group.AdviserId == model.Id
                                            )
                                           .Select(x => new
                                           {
                                               CourseDeliverableSubmissionId = x.Id,
                                               SubmissionId = x.Submission.Id,
                                               Submitter = x.Submission.Submitter.FullName,
                                               SubmitterId = x.Submission.SubmitterId,
                                               ForCourse = x.OfferedCourseDeliverable.OfferedCourse.Course.Name,
                                               GroupName = x.Submission.Group.Name,
                                               Title = x.Submission.Title,
                                               Status = x.Submission.Status
                                           })
                                                .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = $"groups of adviser {model.Id} retrieved successfully",
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

        public async Task<ResponseManager> GetAllResearchTeams()
        {
            try
            {
                var result = await _context.Groups
                                            .Where(sg => sg.IsRetainable == true && sg.Status == "active")
                                            .Select(sg => new {
                                                GroupId = sg.Id,
                                                AdviserId = sg.AdviserId,
                                                Adviser = sg.Adviser.FullName,
                                                GroupName = sg.Name,
                                            })
                                            .ToListAsync();

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "research groups retrieved successfully",
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

        public async Task<ResponseManager> TransferAdviserAccess(TransferAdviserAccessViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");


            var group = await _context.Groups.FindAsync(model.GroupId);

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
    }
}
