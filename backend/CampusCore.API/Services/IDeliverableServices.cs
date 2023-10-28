using CampusCore.API.Models;
using CampusCore.Shared;

namespace CampusCore.API.Services
{
    public interface IDeliverableServices
    {
        Task<ResponseManager> CreateDeliverableAsync(DeliverableAddViewModel model);
    }
    public class DeliverableService : ICourseService
    {
        private AppDbContext _context;
        public DeliverableService(AppDbContext context)
        {
            _context = context;
        }
    }
}
