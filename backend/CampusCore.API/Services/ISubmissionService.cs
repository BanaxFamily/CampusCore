using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static CampusCore.Shared.GetSubmissionsForFacultyViewModel;

namespace CampusCore.API.Services
{


    public interface ISubmissionService
    {
        Task<ResponseManager> FirstSubmission(FirstSubmissionViewModel model);
        Task<ResponseManager> AddNewVersion(AddNewVersionViewModel model);
        Task<ResponseManager> GetAllByOfferedCourseDeliverableAsync(IntIdViewModel model); //basis for faculty
        Task<ResponseManager> GetAllByStudentAsync(GetSubmissionsByStudentViewModel model); //for student
        Task<ResponseManager> GetByIdAsync(IntIdViewModel model);
        Task<ResponseManager> SearchNameAsync(StringSearchViewModel model);
        Task<ResponseManager> DeleteAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateAsync(SubmissionUpdateViewModel model);
        Task<ResponseManager> GetAllSubmissionsForFaculty(GetSubmissionsForFacultyViewModel model);
        Task<ResponseManager> GetAllSubmissionsForDean(GetSubmissionsForDeanViewModel model);
        Task<ResponseManager> GetAllSubmissionsForPRC(GetSubmissionsForPRCViewModel model);
        Task<ResponseManager> GetAllSubmissionsForAdviserReview(GetSubmissionsForAdviserViewModel model);
        Task<ResponseManager> Approve(DigitalSignatureViewModel model);
        Task<ResponseManager> AdviserApprove(SubmissionAdviserApproveViewModel model);




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
            var studentId = model.UserId;
            var offeredCourseDeliverableId = model.OfferedDeliverableId;
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
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId)
                                                 .Select(x => new
                                                 {
                                                     CourseDeliverableSubmissionId = x.Id,
                                                     SubmissionId = x.Submission.Id,
                                                     Submitter = x.Submission.Submitter.FullName,
                                                     GroupName = x.Submission.Group.Name,
                                                     Title = x.Submission.Title,
                                                     Status = x.Submission.Status
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

        public async Task<ResponseManager> GetAllSubmissionsForPRC(GetSubmissionsForPRCViewModel model)
        {
            var isApproved = model.IsApproved;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverable.Deliverable.HighestApprovalNeeded == "PRC Level"
                                                               && cds.Submission.Status == (isApproved ? "PRC Level Approved" : "Dean Level Approved"))
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    SubmitterId = x.Submission.SubmitterId,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status,
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

        public async Task<ResponseManager> GetAllSubmissionsForDean(GetSubmissionsForDeanViewModel model)
        {
            
            var isApproved = model.IsApproved;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverable.Deliverable.HighestApprovalNeeded=="Dean Level" || cds.OfferedCourseDeliverable.Deliverable.HighestApprovalNeeded == "PRC Level"
                                                               && cds.Submission.Status == (isApproved ? "Dean Level Approved" : "Faculty Level Approved"))
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
                                                    Status = x.Submission.Status
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
            var submissionId = model.Id;
            try
            {

                var submissions = await _context.SubmissionVersions
                                                .Where(sv => sv.SubmissionId == submissionId)
                                                .OrderByDescending(sv=>sv.Version.VersionNumber)
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    FilePath = x.Version.FilePath,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status
                                                })
                                                .FirstOrDefaultAsync();


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

        public async Task<ResponseManager> GetAllSubmissionsForFaculty(GetSubmissionsForFacultyViewModel model)
        {
            var offeredCourseDeliverableId = model.OfferedCourseDeliverableId;
            var isApproved = model.IsApproved;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.OfferedCourseDeliverableId == offeredCourseDeliverableId
                                                        && (isApproved && (cds.Submission.Status == "Faculty Level Approved")
                                                        || (!isApproved && cds.Submission.Status == "Unapproved") || cds.Submission.Status == "Adviser Level Approved"))
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    SubmitterId = x.Submission.SubmitterId,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status
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
                                                    Status = x.Submission.Status
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

        public async Task<ResponseManager> Approve(DigitalSignatureViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Submission Model is null");


            var submission = await _context.Submissions.FindAsync(model.SubmissionId);

            var user = await _userManager.FindByIdAsync(model.UserId);

            var encryption = _context.EncryptionKeys.FirstOrDefault();
            if (encryption == null)
            {
                return new ErrorResponseManager
                {
                    Message = "Submission is not approved",
                    IsSuccess = false,
                    Errors = new List<string>() { "No encryption keys stored" }
                };
            }
            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, model.Password);

            if(isPasswordCorrect == false)
            {
                return new ErrorResponseManager
                {
                    Message = "Invalid Password!",
                    IsSuccess = false,
                    Errors = new List<string>() { "Invalid password inputted" }
                };
            }
            /*var generatedPrivateKey = KeyGeneratorStorage.GeneratePrivateKey(model.Password, KeyGeneratorStorage.GenerateRandomSalt(), 10000, 32);

            var encryptGeneratedPrivateKey = KeyGeneratorStorage.EncryptPrivateKey(generatedPrivateKey, encryption.Key, encryption.Iv);
            

*/
            /* if (encryptGeneratedPrivateKey == storedEncryptedPrivateKey)
             {*/
            var digitalSignature = user.EncryptedPrivateKey;

            switch (model.Role)
                {
                    case "Faculty":
                        var facultyApproval = new Approval
                        {
                            ApproverId =  model.UserId,
                            ApproverRole = model.Role,
                            Level = "Faculty Level",
                            ApprovalDate = DateTime.Now,
                            digitalSignature = digitalSignature
                        };
                        _context.Approvals.Add(facultyApproval);
                        var fresult = await _context.SaveChangesAsync();
                        if (fresult > 0)
                        {
                            _context.SubmissionApprovals.Add(new SubmissionApproval
                            {
                                SubmissionId = model.SubmissionId,
                                ApprovalId = facultyApproval.Id
                            });
                            submission.Status = "Faculty Level Approved";
                        }
                        break;
                    case "Dean":
                        var deanApproval = new Approval
                        {
                            ApproverId = model.UserId,
                            ApproverRole = model.Role,
                            Level = "Dean Level",
                            ApprovalDate = DateTime.Now,
                            digitalSignature = digitalSignature
                        };
                        _context.Add(deanApproval);
                        var dresult = await _context.SaveChangesAsync();
                        if (dresult > 0)
                        {
                            _context.SubmissionApprovals.Add(new SubmissionApproval
                            {
                                SubmissionId = model.SubmissionId,
                                ApprovalId = deanApproval.Id
                            });
                            submission.Status = "Dean Level Approved";
                        }
                        break;
                    case "PRC":
                        var prcApproval = new Approval
                        {
                            ApproverId = model.UserId,
                            ApproverRole = model.Role,
                            Level = "PRC Level",
                            ApprovalDate = DateTime.Now,
                            digitalSignature = digitalSignature
                        };
                        _context.Add(prcApproval); 
                        var presult = await _context.SaveChangesAsync();
                        if (presult > 0)
                        {
                            _context.SubmissionApprovals.Add(new SubmissionApproval
                            {
                                SubmissionId = model.SubmissionId,
                                ApprovalId = prcApproval.Id
                            });
                            submission.Status = "PRC Level Approved";
                        }
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
            /* }
             else
             {
                 return new ErrorResponseManager
                 {
                     Message = "Error attaching digital signature",
                     IsSuccess = false,
                     Errors = new List<string>() { "Digital signature invalid" }
                 };
             }*/
        }


        public async Task<ResponseManager> FirstSubmission(FirstSubmissionViewModel model)
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

                bool isGroupSubmission = await _context.OfferedCourseDeliverables
                                                    .Where(ocd => ocd.Id == model.OfferedCourseDeliverableId)
                                                    .Select(ocd => ocd.Deliverable.GroupSubmission)
                                                    .FirstOrDefaultAsync();
                if (isGroupSubmission && model.GroupId == null)
                {
                    return new ErrorResponseManager
                    {
                        Message = "Must add group ID because this is a group submission",
                        IsSuccess = false,
                        Errors = new List<string>() { "Cannot leave groupID field as blank" }
                    };
                }
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

                return new DataResponseManager
                {
                    Message = "Submission is addeded successfully",
                    IsSuccess = true,
                    Data = submission.Id
                };


            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    Message = "Submission is not added",
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> AddNewVersion(AddNewVersionViewModel model)
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
                return new ResponseManager
                {
                    Message = "Submission added successfully",
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new ErrorResponseManager
                {
                    Message = "Submission is not added",
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        public async Task<ResponseManager> GetAllSubmissionsForAdviserReview(GetSubmissionsForAdviserViewModel model)
        {
            var groupId = model.GroupId;
            var adviserId = model.AdviserId;
            var isApproved = model.IsApproved;
            try
            {

                var submissions = await _context.CourseDeliverableSubmissions
                                                .Where(cds => cds.Submission.GroupId == groupId
                                                        && cds.Submission.Group.AdviserId == adviserId
                                                        && cds.Submission.Status == (isApproved ? "Adviser Level Approved" : "Unapproved"))
                                                .Select(x => new
                                                {
                                                    CourseDeliverableSubmissionId = x.Id,
                                                    SubmissionId = x.Submission.Id,
                                                    Submitter = x.Submission.Submitter.FullName,
                                                    SubmitterId = x.Submission.SubmitterId,
                                                    GroupName = x.Submission.Group.Name,
                                                    Title = x.Submission.Title,
                                                    Status = x.Submission.Status
                                                })
                                                .ToListAsync();


                return new DataResponseManager
                {
                    IsSuccess = true,
                    Message = "Submissions for adviser retrieved successfully",
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

        public async Task<ResponseManager> AdviserApprove(SubmissionAdviserApproveViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Submission Model is null");


            var submission = await _context.Submissions.FindAsync(model.SubmissionId);
            var user = await _userManager.FindByIdAsync(model.UserId);

            var encryption = _context.EncryptionKeys.FirstOrDefault();
            if (encryption == null)
            {
                return new ErrorResponseManager
                {
                    Message = "Submission is not approved",
                    IsSuccess = false,
                    Errors = new List<string>() { "No encryption keys stored" }
                };
            }
            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, model.Password);

            if (isPasswordCorrect == false)
            {
                return new ErrorResponseManager
                {
                    Message = "Invalid Password!",
                    IsSuccess = false,
                    Errors = new List<string>() { "Invalid password inputted" }
                };
            }
            /*var generatedPrivateKey = KeyGeneratorStorage.GeneratePrivateKey(model.Password, KeyGeneratorStorage.GenerateRandomSalt(), 10000, 32);

            var encryptGeneratedPrivateKey = KeyGeneratorStorage.EncryptPrivateKey(generatedPrivateKey, encryption.Key, encryption.Iv);*/
            var storedEncryptedPrivateKey = user.EncryptedPrivateKey;


            /*if (encryptGeneratedPrivateKey == storedEncryptedPrivateKey)
            {*/
                var adviserApproval = new Approval
                {
                    ApproverId = model.UserId,
                    ApproverRole = "Adviser",
                    Level = "Adviser Level",
                    ApprovalDate = DateTime.Now,
                    digitalSignature = storedEncryptedPrivateKey
                };
                _context.Add(adviserApproval);
                var dresult = await _context.SaveChangesAsync();
                if (dresult > 0)
                {
                    _context.SubmissionApprovals.Add(new SubmissionApproval
                    {
                        SubmissionId = model.SubmissionId,
                        ApprovalId = adviserApproval.Id
                    });
                    submission.Status = "Adviser Level Approved";
                }


                _context.Submissions.Update(submission);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return new ResponseManager
                    {
                        Message = "Submission is now Adviser Level Approved!",
                        IsSuccess = true
                    };

                }
                return new ErrorResponseManager
                {
                    Message = "Submission is not updated",
                    IsSuccess = false,
                    Errors = new List<string>() { "Error updating submission in DB" }
                };
            /*}
            else
            {
                return new ErrorResponseManager
                {
                    Message = "Error attaching digital signature",
                    IsSuccess = false,
                    Errors = new List<string>() { "Digital signature invalid" }
                };
            }*/
        }

        
    }
}