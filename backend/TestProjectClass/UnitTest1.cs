using Xunit;
using CampusCore.API.Models;
using CampusCore.API.Controllers;
using CampusCore.API.Services;
using CampusCore.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace TestProjectClass
{
    public class AnnouncementTest : IDisposable
    {
        private readonly Mock<IAnnouncementService> _announcementServiceMock;
        private readonly UserManager<User> _userManagerMock;
        private readonly AppDbContext _context;

        public AnnouncementTest()
        {
            // setup the test
            _announcementServiceMock = new Mock<IAnnouncementService>();

            // Create a mock for UserManager<User> with a valid constructor
            var store = new Mock<IUserStore<User>>();
            _userManagerMock = new UserManager<User>(store.Object, null, null, null, null, null, null, null, null);

            _context = new AppDbContext();
        }

        public void Dispose()
        {
            // close down your test
            _context.Dispose();
        }

        [Fact]
        public async Task TestAddAnnouncementIsCorrect()
        {
            // Arrange
            var controller = new AnnouncementController(_announcementServiceMock.Object, _userManagerMock, _context);
            var model = new AnnouncementAddViewModel
            {
                UserId = "8c2e32d2-d9a5-409b-be0a-63b7ec59e01a",
                OfferedCourseId = 6,
                Title = "Test",
                Content = "Test",
            };

            // Set up the mock service to return a success response
            _announcementServiceMock.Setup(service => service.CreateAnnouncementAsync(It.IsAny<AnnouncementAddViewModel>()))
                .ReturnsAsync(new ResponseManager { IsSuccess = true, Message = "Announcement created successfully!" });

            // Act
            var result = await controller.CreateAsync(model) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            // Check only the success message
            var responseManager = Assert.IsType<ResponseManager>(result.Value);
            Assert.Equal("Announcement created successfully!", responseManager.Message);
        }

        [Fact]
        public async Task TestCreateAnnouncementFailed()
        {
            // Arrange
            var controller = new AnnouncementController(_announcementServiceMock.Object, _userManagerMock, _context);
            var model = new AnnouncementAddViewModel
            {
                // optional models here
            };

            // Set up the mock service to return a failure response
            _announcementServiceMock.Setup(service => service.CreateAnnouncementAsync(It.IsAny<AnnouncementAddViewModel>()))
                .ReturnsAsync(new ErrorResponseManager
                {
                    Message = "Announcement is not created",
                    IsSuccess = false,
                    Errors = new List<string> { "Error adding announcement in the Database" }
                });

            // Act
            var result = await controller.CreateAsync(model) as ObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode); // Assuming BadRequest returns status code 400
                                                  // Check only the error message in ErrorResponseManager
            var errorResponseManager = Assert.IsType<ErrorResponseManager>(result.Value);
            Assert.Equal("Announcement is not created", errorResponseManager.Message);
            // You can further assert the error list or other properties if needed
        }
    }
}