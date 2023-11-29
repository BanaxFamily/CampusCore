using CampusCore.API.Migrations;
using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Text.RegularExpressions;

namespace CampusCore.API.Services
{


    public interface ISubmissionService
    {
        Task<ResponseManager> CreateAsync(SubmissionAddViewModel model);
        Task<ResponseManager> GetAllByOfferedCourseDeliverableAsync(IntIdViewModel model);
        Task<ResponseManager> GetAllByStudentAsync(StringIdViewModel model);
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
        private string _uploadPath;

        public SubmissionService(AppDbContext context)
        {
            _context = context;

            // Get the root directory of your application
            var currentDirectory = Directory.GetCurrentDirectory();
            var goUp = Directory.GetParent(currentDirectory);
            var goUp2 = Directory.GetParent(goUp.ToString());
            var basePath = goUp2.ToString();

            // Combine it with the 'Uploads' directory
            _uploadPath = Path.Combine(basePath.ToString(), "Uploads");

            // Check if the directory exists; create it if not
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }
        public async Task<ResponseManager> CreateAsync(SubmissionAddViewModel model)
        {
            try
            {
                if (model == null)
                    throw new NullReferenceException("Submission Model is null");

                //process File and copy to path
                if (model.File == null && model.File.Length <= 0)
                {


                    return new ErrorResponseManager
                    {
                        Message = "Something wrong occured while adding the file",
                        IsSuccess = false,
                        Errors = new List<string>() { "Error extracting file content" }
                    };

                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
                var filePath = Path.Combine(_uploadPath, fileName); // Specify your file upload path

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await model.File.CopyToAsync(fileStream);
                }
                //if first submission
                if (model.SubmissionId == null)
                {
                    //create submission
                    var submission = new Submission
                    {
                        Title = model.Title,
                        SubmitterId = model.SubmitterId,
                        GroupId = model.GroupId,
                        Status = "Unapproved",
                    };
                    _context.Submissions.Add(submission);
                    var results = await _context.SaveChangesAsync();

                    if (results < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Submission is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error creating submission and adding it to submission table in DB" }
                        };
                    }
                    //create version 
                    var version = new Models.Version
                    {
                        VersionNumber = 1,
                        DateSubmitted = DateTime.Now,
                        FileType = model.FileType,
                        FilePath = filePath,
                        TargetedIssues = string.Join(",", model.TargetedIssues)//concat issue targets to store in one field

                    };
                    _context.Versions.Add(version);

                    var res = await _context.SaveChangesAsync();

                    if (res < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "First version is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding version in version table in DB" }
                        };
                    }

                    //add to submission version
                    _context.SubmissionVersions.Add(new SubmissionVersion
                    {
                        SubmissionId = submission.Id,
                        VersionId = version.VersionId
                    });
                    var resu = await _context.SaveChangesAsync();
                    if (resu < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "version is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding version in SubmissionVersion table in DB" }
                        };
                    }

                    //add submission to course deliverable submission
                    var cds = new CourseDeliverableSubmission()
                    {
                        OfferedCourseDeliverableId = model.OfferedCourseDeliverableId,
                        SubmissionId = submission.Id

                    };
                    _context.CourseDeliverableSubmissions.Add(cds);
                    var re = await _context.SaveChangesAsync();
                    if (re < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Submission is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding submission in CourseDeliverableSubmissions table in DB" }
                        };
                    }
                }
                else
                {
                    //no need to create submission

                    //discover what version number is this version
                    var subCount = _context.SubmissionVersions
                                       .Where(sv => sv.SubmissionId == model.SubmissionId)
                                       .Count();

                    //create version 
                    var version = new Models.Version
                    {
                        VersionNumber = subCount + 1,
                        DateSubmitted = DateTime.Now,
                        FileType = model.FileType,
                        FilePath = filePath,
                        TargetedIssues = string.Join(",", model.TargetedIssues)//concat issue targets to store in one field

                    };
                    _context.Versions.Add(version);

                    var res = await _context.SaveChangesAsync();

                    if (res < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "First version is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding version in version table in DB" }
                        };
                    }

                    //add to submission version
                    _context.SubmissionVersions.Add(new SubmissionVersion
                    {
                        SubmissionId = (int)model.SubmissionId,
                        VersionId = version.VersionId
                    });
                    var resu = await _context.SaveChangesAsync();
                    if (resu < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "version is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding version in SubmissionVersion table in DB" }
                        };
                    }

                    //add submission to course deliverable submission
                    var cds = new CourseDeliverableSubmission()
                    {
                        OfferedCourseDeliverableId = model.OfferedCourseDeliverableId,
                        SubmissionId = (int)model.SubmissionId

                    };
                    _context.CourseDeliverableSubmissions.Add(cds);
                    var re = await _context.SaveChangesAsync();
                    if (re < 1)
                    {
                        return new ErrorResponseManager
                        {
                            Message = "Submission is not added",
                            IsSuccess = false,
                            Errors = new List<string>() { "Error adding submission in CourseDeliverableSubmissions table in DB" }
                        };
                    }
                }


                return new ResponseManager
                {
                    Message = "Submission added successfully",
                    IsSuccess = true
                };
            }catch(Exception ex)
            {
                return new ErrorResponseManager
                {
                    Message = "Submission is not added",
                    IsSuccess = false,
                    Errors = new List<string>() {ex.Message}
                };
            }
            



            
        }

        //not modified but will not use
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

        public async Task<ResponseManager> GetAllByStudentAsync(StringIdViewModel model)
        {
            var studentId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds =>
                                                            cds.Submission.SubmitterId == studentId ||
                                                            (cds.Submission.GroupId.HasValue &&
                                                                _context.StudentGroups.Any(sg =>
                                                                    sg.GroupId == cds.Submission.GroupId.Value &&
                                                                    sg.StudentId == studentId))
                                                        )
                                                 .Select(x => new
                                                 {
                                                     CourseDeliverableSubmissionId = x.Id,
                                                     SubmissionId = x.Submission.Id,
                                                     Submitter = x.Submission.Submitter.FullName,
                                                     GroupName = x.Submission.Group.Name,
                                                     Title = x.Submission.Title,
                                                     Status = x.Submission.Status,
                                                     DAFaculty = x.Submission.DAFaculty,
                                                     DADean = x.Submission.DADean,
                                                     DAPRC = x.Submission.DAPRC,
                                                 })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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

        public async Task<ResponseManager> GetAllByOfferedCourseDeliverableAsync(IntIdViewModel model)
        {
            var offeredCourseDeliverableId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId)
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();

                if (submissions.Count() < 1)
                {
                    return new ResponseManager
                    {
                        IsSuccess = true,
                        Message = "No submissions retrieved"
                    };
                }

                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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
            var offeredCourseDeliverableId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId
                                                              && cds.Submission.Status == "Dean Level Approved")
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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
            var offeredCourseDeliverableId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId
                                                              && cds.Submission.Status == "Faculty Level Approved")
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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
            var offeredCourseDeliverableId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId
                                                              && cds.Submission.Status == "PRC Level Approved")
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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
            var courseDeliverableSubmissionId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.Id == courseDeliverableSubmissionId)
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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

        public async Task<ResponseManager> GetUnapproved(IntIdViewModel model)
        {
            var offeredCourseDeliverableId = model.Id;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId
                                                        && cds.Submission.Status == "Unapproved")
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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



        public async Task<ResponseManager> SearchNameAsync(StringSearchViewModel model)
        {
            string searchKey = model.SearchKey;

            try
            {
                
                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(oc => EF.Functions.Like(oc.Submission.Title, $"%{model.SearchKey}%"))
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
                                                    DAFaculty = x.Submission.DAFaculty,
                                                    DADean = x.Submission.DADean,
                                                    DAPRC = x.Submission.DAPRC,
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions approved by dean retrieved successfully",
                    Data = submissions
                };


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