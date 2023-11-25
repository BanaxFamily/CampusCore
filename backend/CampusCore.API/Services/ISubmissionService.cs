﻿using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{


    public interface ISubmissionService
    {
        Task<ResponseManager> CreateAsync(SubmissionAddViewModel model);
        Task<ResponseManager> GetAllByCourseDeliverableAsync(GetSubmissionsByDeliverableViewModel model);
        Task<ResponseManager> GetAllByStudentAsync(GetSubmissionsByStudentViewModel model);
        Task<ResponseManager> GetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> SearchNameAsync(StringSearchViewModel model);
        Task<ResponseManager> DeleteAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateAsync(SubmissionUpdateViewModel model);
        Task<ResponseManager> GetUnapproved(IntIdViewModel model);
        Task<ResponseManager> GetApprovedFaculty(IntIdViewModel model);
        Task<ResponseManager> GetApprovedDean(IntIdViewModel model);
        Task<ResponseManager> GetApprovedPRC(IntIdViewModel model);
        Task<ResponseManager> Approve(SubmissionApproveViewModel model);



    }

    public class SubmissionService : ISubmissionService
    {
        private AppDbContext _context;
        private UserManager<User> _userManager;
        private string _uploadPath;

        public SubmissionService(AppDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;


            // Combine it with the 'Uploads' directory by going up two levels
            _uploadPath = "H:\\Campuscore system\\CampusCore\\CampusCore\\backend\\Uploads";
            // Check if the directory exists; create it if not
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }
        public async Task<ResponseManager> CreateAsync(SubmissionAddViewModel model)
        {
            
            if (model == null)
                throw new NullReferenceException("Submission Model is null");

            var subCount = _context.CourseDeliverableSubmissions
                                   .Where(cds => cds.CourseDeliverableId == model.ForCourseDeliverable)
                                   .Count();
            if (model.File != null && model.File.Length > 0)
            {
                

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
                var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await model.File.CopyToAsync(fileStream);
                }

                var submission = new Submission
                {
                    Title = model.Title,
                    SubmitterId = model.SubmitterId,
                    GroupId = model.GroupId,
                    Version = $"Version {subCount}",
                    Status = model.Status,
                    DateSubmitted = DateTime.Now,
                    FilePath = filePath

                };


                _context.Submissions.Add(submission);
                var resultS = await _context.SaveChangesAsync();

                var cds = new CourseDeliverableSubmission()
                {
                    CourseDeliverableId = model.ForCourseDeliverable,
                    SubmissionId = submission.Id

                };
                _context.CourseDeliverableSubmissions.Add(cds);

                var resultCds = await _context.SaveChangesAsync();
                if (resultS > 0)
                {
                    if (resultCds > 0)
                    {
                        return new ResponseManager
                        {
                            Message = "Submission added successfully!",
                            IsSuccess = true
                        };
                    }
                    else
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Submission is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding submission in CourseDeliverableSubmissions table in DB" }
                        };
                    }


                }
            }
                

            return new ErrorResponseManager
            {
                Message = "Submission is not added",
                IsSuccess = false,
                Errors = new List<string>() { "Error adding submission in Submissions table in DB" }
            };
        }

        public async Task<ResponseManager> DeleteAsync(IntIdViewModel model)
        {
            try
            {
                var submission = await _context.Submissions.FindAsync(model.Id);
                var cds = await _context.CourseDeliverableSubmissions
                                        .FirstAsync(cds => cds.SubmissionId == model.Id);

                if (submission == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "submission not found",
                        Errors = new List<string> { "submission with the specified ID does not exist" }
                    };
                }

                _context.CourseDeliverableSubmissions.Remove(cds);
                _context.Submissions.Remove(submission);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "submission deleted successfully"
                    };
                }
                else
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "submission deletion failed",
                        Errors = new List<string> { "Error occurred while deleting the submission" }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while deleting the submission",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllByStudentAsync(GetSubmissionsByStudentViewModel model)
        {
          
            var deliverableId = model.CourseDeliverableId;

            
                var studentGroup = _context.StudentGroups
                                       .Where(sg => sg.StudentId == model.UserId && sg.Group.OfferedCourseId == model.OfferedCourseId)
                                       .FirstOrDefault();
            
            
                                       

            try
            {
                List<CourseDeliverableSubmission>cdsBySubmissions;
                if (studentGroup != null)
                {
                    cdsBySubmissions = await _context.CourseDeliverableSubmissions
                                                        .Include(cds => cds.Submission)
                                                        .Include(cds => cds.CourseDeliverable)
                                                        .Include(cds => cds.Submission.Group)
                                                        .Include(cds => cds.CourseDeliverable.Deliverable)
                                                        .Where(cd => cd.Submission.GroupId == studentGroup.GroupId || cd.Submission.SubmitterId == model.UserId)
                                                        .Where(cd => cd.CourseDeliverableId == model.CourseDeliverableId)
                                                        .ToListAsync();
                }
                else
                {
                    var c = await _context.CourseDeliverableSubmissions
                        .Include(cds => cds.Submission)
                        .Include(cds => cds.Submission.Submitter)
                        .Include(cds => cds.CourseDeliverable)
                        .Include(cds => cds.Submission.Group)
                        .Include(cds => cds.CourseDeliverable.Deliverable).ToListAsync();

                    cdsBySubmissions = await _context.CourseDeliverableSubmissions
                                                                            .Include(cds => cds.Submission)
                                                                            .Include(cds => cds.CourseDeliverable)
                                                                            .Include(cds => cds.Submission.Group)
                                                                            .Include(cds => cds.CourseDeliverable.Deliverable)
                                                                            .Where(cd => cd.Submission.SubmitterId == model.UserId && cd.CourseDeliverableId == model.CourseDeliverableId)
                                                                        
                                                                            .ToListAsync();
                }


               
                try
                {


                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    if(cdsBySubmissions.Count < 1)
                    {
                        return new ErrorResponseManager
                        {
                            IsSuccess = false,
                            Message = "no cds restrieved",
                            Errors = new List<string> { "no cds retrieved " }
                        };
                    }
                    foreach (var item in cdsBySubmissions)
                    {
                        
                        //to get authors
                        string authors, groupname;
                        if(item.Submission.GroupId != null)
                        {
                            var members = await _context.StudentGroups
                                                        .Include(sg => sg.Student)
                                                        .Where(sg => sg.Id == item.Submission.GroupId)
                                                        .ToListAsync();
                            authors = string.Join(", ", members.Select(group => group.Student.FullName));
                            groupname = item.Submission.Group.Name;
                        }
                        else
                        {
                            authors = item.Submission.Submitter.FullName;
                            groupname = "No group";
                        }
                        

                        var filePath = item.Submission.FilePath;

                        

                        var submission = new SubmissionGetAllViewModel
                        {
                            SubmissionId = item.Submission.Id,
                            Submitter = item.Submission.Submitter.FullName,
                            Authors = authors,
                            GroupName = groupname,
                            Title = item.Submission.Title,
                            Status = item.Submission.Status,
                            DAFaculty = item.Submission.DAFaculty,
                            DADean = item.Submission.DADean,
                            DAPRC = item.Submission.DAPRC,
                            File = filePath,
                            Version = item.Submission.Version,
                            DateSubmitted = item.Submission.DateSubmitted
                        };
                        data.Add(submission);
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submissions approved by dean retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submissions approved by dean",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submissions from course deliverable submissions table",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllByCourseDeliverableAsync(GetSubmissionsByDeliverableViewModel model)
        {
            var deliverableId = model.CourseDeliverableId;


            try
            {
                var cdsBySubmissions = await _context.CourseDeliverableSubmissions
                                                        .Include(cds => cds.Submission)
                                                        .Include(cds => cds.CourseDeliverable)
                                                        .Include(cds => cds.Submission.Group)
                                                        .Include(cds => cds.CourseDeliverable.Deliverable)
                                                        .Where(cd => cd.CourseDeliverableId == model.CourseDeliverableId)
                                                        .ToListAsync();



                try
                {


                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in cdsBySubmissions)
                    {

                        //to get authors
                        string authors, groupname;
                        if (item.Submission.GroupId != null)
                        {
                            var members = await _context.StudentGroups
                                                        .Include(sg => sg.Student)
                                                        .Where(sg => sg.Id == item.Submission.GroupId)
                                                        .ToListAsync();
                            authors = string.Join(", ", members.Select(group => group.Student.FullName));
                            groupname = item.Submission.Group.Name;
                        }
                        else
                        {
                            authors = item.Submission.Submitter.FullName;
                            groupname = "No group";
                        }


                        var filePath = item.Submission.FilePath;

                        // Open the file stream
                        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                        // Create an IFormFile instance
                        var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                        {
                            Headers = new HeaderDictionary(),
                            ContentType = "application/octet-stream" // Set the content type based on your file type
                        };

                        var submission = new SubmissionGetAllViewModel
                        {
                            SubmissionId = item.Submission.Id,
                            Submitter = item.Submission.Submitter.FullName,
                            Authors = authors,
                            GroupName = groupname,
                            Title = item.Submission.Title,
                            Status = item.Submission.Status,
                            DAFaculty = item.Submission.DAFaculty,
                            DADean = item.Submission.DADean,
                            DAPRC = item.Submission.DAPRC,
                            File = filePath,
                            Version = item.Submission.Version,
                            DateSubmitted = item.Submission.DateSubmitted
                        };
                        data.Add(submission);
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submissions approved by dean retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submissions approved by dean",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submissions from course deliverable submissions table",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetApprovedDean(IntIdViewModel model)
        {
            var courseDeliverable = model.Id;
            try
            {
                var submissionsByCD = await _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.Submission)
                                                .Include(cds => cds.Submission.Group)
                                                .Include(cds => cds.Submission.Submitter)
                                                .Include(cds => cds.CourseDeliverable)
                                                .Include(cds => cds.CourseDeliverable.Deliverable)
                                                .Where(cds => cds.CourseDeliverableId == model.Id)
                                                .ToListAsync();
                try
                {
                    var results = submissionsByCD.Select(cds => cds.Submission)
                                                 .Where(s => s.DAFaculty != null && s.DADean != null);

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in results)
                    {
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();

                        var filePath = item.FilePath;

                        // Open the file stream
                        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                        // Create an IFormFile instance
                        var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                        {
                            Headers = new HeaderDictionary(),
                            ContentType = "application/octet-stream" // Set the content type based on your file type
                        };

                        var submission = new SubmissionGetAllViewModel()
                        {
                            SubmissionId = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            Title = item.Title,
                            Status = item.Status,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC,
                            File = filePath,
                            Version = item.Version,
                            DateSubmitted = item.DateSubmitted
                        };
                        data.Add(submission);
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submissions approved by dean retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submissions approved by dean",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submissions from course deliverable submissions table",
                    Errors = new List<string> { ex.Message }
                };
            }


        }

        public async Task<ResponseManager> GetApprovedFaculty(IntIdViewModel model)
        {
            var courseDeliverable = model.Id;
            try
            {
                var submissionsByCD = await _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.Submission)
                                                .Include(cds => cds.Submission.Group)
                                                .Include(cds => cds.Submission.Submitter)
                                                .Include(cds => cds.CourseDeliverable)
                                                .Include(cds => cds.CourseDeliverable.Deliverable)
                                                .Where(cds => cds.CourseDeliverableId == model.Id)
                                                .ToListAsync();
                try
                {
                    var results = submissionsByCD.Select(cds => cds.Submission)
                                                 .Where(s => s.DAFaculty != null);

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in results)
                    {
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();

                        var filePath = item.FilePath;

                        // Open the file stream
                        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                        // Create an IFormFile instance
                        var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                        {
                            Headers = new HeaderDictionary(),
                            ContentType = "application/octet-stream" // Set the content type based on your file type
                        };

                        var submission = new SubmissionGetAllViewModel()
                        {
                            SubmissionId = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            Title = item.Title,
                            Status = item.Status,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC,
                            File = filePath,
                            Version = item.Version,
                            DateSubmitted = item.DateSubmitted
                        };
                        data.Add(submission);
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submissions approved by faculty retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submissions approved by faculty",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submissions from course deliverable submissions table",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetApprovedPRC(IntIdViewModel model)
        {
            var courseDeliverable = model.Id;
            try
            {
                var submissionsByCD = await _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.Submission)
                                                .Include(cds => cds.Submission.Group)
                                                .Include(cds => cds.Submission.Submitter)
                                                .Include(cds => cds.CourseDeliverable)
                                                .Include(cds => cds.CourseDeliverable.Deliverable)
                                                .Where(cds => cds.CourseDeliverableId == model.Id)
                                                .ToListAsync();
                try
                {
                    var results = submissionsByCD.Select(cds => cds.Submission)
                                                 .Where(s => s.DAFaculty != null && s.DADean != null && s.DAPRC != null);

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in results)
                    {
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();

                        var filePath = item.FilePath;

                        // Open the file stream
                        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                        // Create an IFormFile instance
                        var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                        {
                            Headers = new HeaderDictionary(),
                            ContentType = "application/octet-stream" // Set the content type based on your file type
                        };

                        var submission = new SubmissionGetAllViewModel()
                        {
                            SubmissionId = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            Title = item.Title,
                            Status = item.Status,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC,
                            File = filePath,
                            Version = item.Version,
                            DateSubmitted = item.DateSubmitted
                        };
                        data.Add(submission);
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submissions approved by PRC retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submissions approved by PRC",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submissions from course deliverable submissions table",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetByIdAsync(IntIdViewModel model)
        {
            try
            {
                var item = await _context.Submissions.FindAsync(model.Id);


                var members = await _context.StudentGroups
                                            .Where(sg => sg.Id == item.GroupId)
                                            .ToListAsync();
                try
                {
                    var coursedeliverable = _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.CourseDeliverable)
                                                .Include(cds => cds.CourseDeliverable.Deliverable) //include these to access deliverable name
                                                .Where(cds => cds.SubmissionId == model.Id)
                                                .First();
                    var filePath = item.FilePath;

                    // Open the file stream
                    var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                    // Create an IFormFile instance
                    var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "application/octet-stream" // Set the content type based on your file type
                    };

                    var data = new SubmissionGetAllViewModel()
                    {
                        SubmissionId = item.Id,
                        Submitter = item.Submitter.FullName,
                        Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                        GroupName = item.Group.Name,
                        Title = item.Title,
                        Status = item.Status,
                        DAFaculty = item.DAFaculty,
                        DADean = item.DADean,
                        DAPRC = item.DAPRC,
                        File = filePath,
                        Version = item.Version,
                        DateSubmitted = item.DateSubmitted
                    };


                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submission with specified id retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submission with specified id",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submission with specified id. No assigned course deliverable.",
                    Errors = new List<string> { ex.Message }
                };
            }



        }

        public async Task<ResponseManager> GetUnapproved(IntIdViewModel model)
        {
            var courseDeliverable = model.Id;
            try
            {
                var submissionsByCD = await _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.Submission)
                                                .Include(cds => cds.Submission.Group)
                                                .Include(cds => cds.Submission.Submitter)
                                                .Include(cds => cds.CourseDeliverable)
                                                .Where(cds => cds.CourseDeliverableId == model.Id)
                                                .ToListAsync();
                try
                {
                    var results = submissionsByCD.Select(cds => cds.Submission)
                                                 .Where(s => s.DAFaculty == null && s.DADean == null && s.DAPRC == null);

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in results)
                    {
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();

                        var filePath = item.FilePath;

                        // Open the file stream
                        var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                        // Create an IFormFile instance
                        var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                        {
                            Headers = new HeaderDictionary(),
                            ContentType = "application/octet-stream" // Set the content type based on your file type
                        };

                        var submission = new SubmissionGetAllViewModel()
                        {
                            SubmissionId = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            Title = item.Title,
                            Status = item.Status,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC,
                            File = filePath,
                            Version = item.Version,
                            DateSubmitted = item.DateSubmitted
                        };
                        data.Add(submission);
                    }

                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Unapproved retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching unapproved submissions",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching unapproved submissions from course deliverable submissions table",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> UpdateAsync(SubmissionUpdateViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Submission Model is null");


            var submission = await _context.Submissions.FindAsync(model.Id);

            submission.Title = model.Title;

            _context.Submissions.Update(submission);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Submission updated successfully!",
                    IsSuccess = true
                };

            }

            return new ErrorResponseManager
            {
                Message = "Submission is not updated",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating submission in DB" }
            };
        }

        public async Task<ResponseManager> GetLatestVersion(IntIdViewModel model)
        {
            try
            {

                var item = _context.CourseDeliverableSubmissions
                                      .Where(cds => cds.CourseDeliverableId == model.Id)
                                      .OrderByDescending(s => s.Submission.DateSubmitted)
                                      .Select(cds => cds.Submission)
                                      .FirstOrDefault();
                if (item == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "There is no latest submission",
                        Errors = new List<string> { "No latest submission in DB" }
                    };
                }

                var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();
                try
                {
                    var coursedeliverable = _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.CourseDeliverable)
                                                .Include(cds => cds.CourseDeliverable.Deliverable) //include these to access deliverable name
                                                .Where(cds => cds.SubmissionId == model.Id)
                                                .First();
                    var filePath = item.FilePath;

                    // Open the file stream
                    var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

                    // Create an IFormFile instance
                    var formFile = new FormFile(fileStream, 0, fileStream.Length, null, Path.GetFileName(filePath))
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "application/octet-stream" // Set the content type based on your file type
                    };

                    var data = new SubmissionGetAllViewModel()
                    {
                        SubmissionId = item.Id,
                        Submitter = item.Submitter.FullName,
                        Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                        GroupName = item.Group.Name,
                        Title = item.Title,
                        Status = item.Status,
                        DAFaculty = item.DAFaculty,
                        DADean = item.DADean,
                        DAPRC = item.DAPRC,
                        File = filePath,
                        Version = item.Version,
                        DateSubmitted = item.DateSubmitted
                    };


                    return new DataResponseManager
                    {
                        IsSuccess = true,
                        Message = "Submission with specified id retrieved successfully",
                        Data = data
                    };
                }
                catch (Exception ex)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "An error occurred while fetching submission with specified id",
                        Errors = new List<string> { ex.Message }
                    };
                }
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching submission with specified id. No assigned course deliverable.",
                    Errors = new List<string> { ex.Message
                    }
                };
            }
        }


        public async Task<ResponseManager> SearchNameAsync(StringSearchViewModel model)
        {
            string searchKey = model.SearchKey;

            try
            {

                var searchResults = await _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.Submission)
                                                .Include(cds => cds.Submission.Group)
                                                .Include(cds => cds.Submission.Submitter)
                                                .Include(cds => cds.CourseDeliverable)
                                                .Where(oc => EF.Functions.Like(oc.Submission.Title, $"%{model.SearchKey}%"))
                                                .ToListAsync();



                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Searched courses retrieved successfully",
                    Data = searchResults
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    IsSuccess = false,
                    Message = "An error occurred while fetching searched courses",
                    Errors = new List<string> { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> Approve(SubmissionApproveViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Submission Model is null");


            var submission = await _context.Submissions.FindAsync(model.Id);

            switch (model.Role)
            {
                case "Faculty":
                    submission.DAFaculty = DateTime.Now;
                    submission.Status = "Faculty Level Approved";
                    break;
                case "Dean":
                    submission.DADean = DateTime.Now;
                    submission.Status = "Dean Level Approved";
                    break;
                case "PRC":
                    submission.DAPRC = DateTime.Now;
                    submission.Status = "PRC Level Approved";
                    break;
                default:
                    break;
            }

            _context.Submissions.Update(submission);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return new ResponseManager
                {
                    Message = "Submission updated successfully!",
                    IsSuccess = true
                };

            }

            return new ErrorResponseManager
            {
                Message = "Submission is not updated",
                IsSuccess = false,
                Errors = new List<string>() { "Error updating submission in DB" }
            };
        }
    }
}
