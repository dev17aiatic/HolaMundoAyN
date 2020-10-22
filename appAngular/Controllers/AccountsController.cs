using Microsoft.AspNetCore.Mvc;
using appAngular.viewIdentity;
using appAngular.helpers;
using AutoMapper;
using appAngular.Identity;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using appAngular.Data;


namespace appAngular.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager,IMapper mapper,ApplicationDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper=mapper;
            _appDbContext=appDbContext;           
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity=_mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.JobSeekers.AddAsync(new JobSeekercs{IdentityId=userIdentity.Id, Location=model.Location});
            await _appDbContext.SaveChangesAsync();
            
            return new OkObjectResult("Account created");
        }
        
    }
}