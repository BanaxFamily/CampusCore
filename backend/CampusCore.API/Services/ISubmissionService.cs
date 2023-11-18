using CampusCore.API.Models;
using CampusCore.Shared;
using Microsoft.EntityFrameworkCore;

namespace CampusCore.API.Services
{
    

    public interface ISubmissionService
    {
        Task<ResponseManager> CreateAsync(SubmissionAddViewModel model);
        Task<ResponseManager> GetAllByCourseAsync(IntIdViewModel model);
        Task<ResponseManager> GetAllByStudentAsync(StringIdViewModel model);
        Task<ResponseManager> GetByIdAsync(IntIdViewModel model);
        //Task<ResponseManager> SearchNameAsync(StringSearchViewModel model);
        Task<ResponseManager> DeleteAsync(IntIdViewModel model);
        Task<ResponseManager> UpdateAsync(SubmissionUpdateViewModel model);
        Task<ResponseManager> GetUnapproved(IntIdViewModel model);
        Task<ResponseManager> GetApprovedFaculty(IntIdViewModel model);
        Task<ResponseManager> GetApprovedDean(IntIdViewModel model);
        Task<ResponseManager> GetApprovedPRC(IntIdViewModel model);

    }

    public class SubmissionService : ISubmissionService
    {
        private AppDbContext _context;

        public SubmissionService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ResponseManager> CreateAsync(SubmissionAddViewModel model)
        {
            if (model == null)
                throw new NullReferenceException("Submission Model is null");
            
            
            var submission = new Submission
            {
                Title = model.Title,
                SubmitterId = model.SubmitterId,
                GroupId = model.GroupId
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
                if(resultCds > 0)
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

                if (submission == null)
                {
                    return new ErrorResponseManager
                    {
                        IsSuccess = false,
                        Message = "submission not found",
                        Errors = new List<string> { "submission with the specified ID does not exist" }
                    };
                }

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
                var submissionsByStudent = await _context.Submissions
                                                .Include(cds => cds.Group)
                                                .Where(cds => cds.SubmitterId == studentId)
                                                .ToListAsync();
                
                try
                {
                    

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in submissionsByStudent)
                    {
                        //to get authors
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();
                        //to get course deliverable to which this submission is submitted
                        var cdsBySubmission = _context.CourseDeliverableSubmissions
                                                        .Include(cds => cds.Submission)
                                                        .Include(cds => cds.CourseDeliverable)
                                                        .Include(cds => cds.CourseDeliverable.Deliverable)
                                                        .Where(cd=> cd.Submission.GroupId == item.GroupId || cd.Submission.SubmitterId == item.SubmitterId)
                                                        .First();
                        var coursedeliverable = cdsBySubmission.CourseDeliverable.Deliverable.Name;

                        bool facultyA = false, deanA = false, prcA = false;

                        if (item.DAFaculty != null)
                        {
                            facultyA = true;
                        }
                        if (item.DADean != null)
                        {
                            deanA = true;
                        }
                        if (item.DAPRC != null)
                        {
                            prcA = true;
                        }

                        var submission = new SubmissionGetAllViewModel()
                        {
                            Id = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            ForCourseDeliverable = coursedeliverable,
                            Title = item.Title,
                            ApprovedFaculty = facultyA,
                            ApprovedDean = deanA,
                            ApprovedPRC = prcA,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC
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

        public async Task<ResponseManager> GetAllByCourseAsync(IntIdViewModel model)
        {
            var courseId = model.Id;
            try
            {
                
                var submissionsByCourse = await _context.CourseDeliverableSubmissions
                                                .Include(cds => cds.Submission)
                                                .Include(cds => cds.Submission.Group)
                                                .Include(cds => cds.Submission.Submitter)
                                                .Include(cds => cds.CourseDeliverable)
                                                .Include(cds => cds.CourseDeliverable.Deliverable)
                                                .Where(cds => cds.CourseDeliverable.OfferedCourse.Id == courseId)
                                                .ToListAsync();
                
                try
                {
                    var results = submissionsByCourse.Select(cds => cds.Submission);

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in results)
                    {
                        //to get authors
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();

                        var coursedeliverable = submissionsByCourse.First().CourseDeliverable.Deliverable.Name;

                        bool facultyA = false, deanA = false, prcA = false;

                        if (item.DAFaculty != null)
                        {
                            facultyA = true;
                        }
                        if (item.DADean != null)
                        {
                            deanA = true;
                        }
                        if (item.DAPRC != null)
                        {
                            prcA = true;
                        }

                        var submission = new SubmissionGetAllViewModel()
                        {
                            Id = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            ForCourseDeliverable = coursedeliverable,
                            Title = item.Title,
                            ApprovedFaculty = facultyA,
                            ApprovedDean = deanA,
                            ApprovedPRC = prcA,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC
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
                                                .Where(cds => cds.Id == model.Id)
                                                .ToListAsync();
                var coursedeliverable = submissionsByCD.First().CourseDeliverable.Deliverable.Name;
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

                        bool facultyA = false, deanA = false, prcA = false;

                        if (item.DAFaculty != null)
                        {
                            facultyA = true;
                        }
                        if (item.DADean != null)
                        {
                            deanA = true;
                        }
                        if (item.DAPRC != null)
                        {
                            prcA = true;
                        }

                        var submission = new SubmissionGetAllViewModel()
                        {
                            Id = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            ForCourseDeliverable = coursedeliverable,
                            Title = item.Title,
                            ApprovedFaculty = facultyA,
                            ApprovedDean = deanA,
                            ApprovedPRC = prcA,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC
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
                                                .Where(cds => cds.Id == model.Id)
                                                .ToListAsync();
                var coursedeliverable = submissionsByCD.First().CourseDeliverable.Deliverable.Name;
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

                        bool facultyA = false, deanA = false, prcA = false;

                        if (item.DAFaculty != null)
                        {
                            facultyA = true;
                        }
                        if (item.DADean != null)
                        {
                            deanA = true;
                        }
                        if (item.DAPRC != null)
                        {
                            prcA = true;
                        }

                        var submission = new SubmissionGetAllViewModel()
                        {
                            Id = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            ForCourseDeliverable = coursedeliverable,
                            Title = item.Title,
                            ApprovedFaculty = facultyA,
                            ApprovedDean = deanA,
                            ApprovedPRC = prcA,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC
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
                                                .Where(cds => cds.Id == model.Id)
                                                .ToListAsync();
                var coursedeliverable = submissionsByCD.First().CourseDeliverable.Deliverable.Name;
                try
                {
                    var results = submissionsByCD.Select(cds => cds.Submission)
                                                 .Where(s => s.DAFaculty != null && s.DADean != null && s.DAPRC !=null);

                    List<SubmissionGetAllViewModel> data = new List<SubmissionGetAllViewModel>();

                    foreach (var item in results)
                    {
                        var members = await _context.StudentGroups
                                                    .Where(sg => sg.Id == item.GroupId)
                                                    .ToListAsync();

                        bool facultyA = false, deanA = false, prcA = false;

                        if (item.DAFaculty != null)
                        {
                            facultyA = true;
                        }
                        if (item.DADean != null)
                        {
                            deanA = true;
                        }
                        if (item.DAPRC != null)
                        {
                            prcA = true;
                        }

                        var submission = new SubmissionGetAllViewModel()
                        {
                            Id = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            ForCourseDeliverable = coursedeliverable,
                            Title = item.Title,
                            ApprovedFaculty = facultyA,
                            ApprovedDean = deanA,
                            ApprovedPRC = prcA,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC
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
                    bool facultyA = false, deanA = false, prcA = false;

                    if (item.DAFaculty != null)
                    {
                        facultyA = true;
                    }
                    if (item.DADean != null)
                    {
                        deanA = true;
                    }
                    if (item.DAPRC != null)
                    {
                        prcA = true;
                    }

                    var data = new SubmissionGetAllViewModel()
                    {
                        Id = item.Id,
                        Submitter = item.Submitter.FullName,
                        Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                        GroupName = item.Group.Name,
                        ForCourseDeliverable = coursedeliverable.CourseDeliverable.Deliverable.Name,
                        Title = item.Title,
                        ApprovedFaculty = facultyA,
                        ApprovedDean = deanA,
                        ApprovedPRC = prcA,
                        DAFaculty = item.DAFaculty,
                        DADean = item.DADean,
                        DAPRC = item.DAPRC
                    }; ;


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
                                                .Include(cds => cds.CourseDeliverable.Deliverable)
                                                .Where(cds => cds.Id == model.Id)
                                                .ToListAsync();
                var coursedeliverable = submissionsByCD.First().CourseDeliverable.Deliverable.Name;
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

                        bool facultyA = false, deanA = false, prcA = false;

                        if (item.DAFaculty != null)
                        {
                            facultyA = true;
                        }
                        if (item.DADean != null)
                        {
                            deanA = true;
                        }
                        if (item.DAPRC != null)
                        {
                            prcA = true;
                        }

                        var submission = new SubmissionGetAllViewModel()
                        {
                            Id = item.Id,
                            Submitter = item.Submitter.FullName,
                            Authors = string.Join(", ", members.Select(group => group.Student.FullName)),
                            GroupName = item.Group.Name,
                            ForCourseDeliverable = coursedeliverable,
                            Title = item.Title,
                            ApprovedFaculty = facultyA,
                            ApprovedDean = deanA,
                            ApprovedPRC = prcA,
                            DAFaculty = item.DAFaculty,
                            DADean = item.DADean,
                            DAPRC = item.DAPRC
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
    }
}
