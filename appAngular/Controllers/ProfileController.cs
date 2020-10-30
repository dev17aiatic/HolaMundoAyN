using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using appAngular.Data;
using appAngular.Identity;
using Newtonsoft.Json;
using appAngular.viewIdentity;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using appAngular.helpers;


namespace appAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private IPasswordHasher<AppUser> _passwordHasher;



        public ProfileController(ApplicationDbContext context, UserManager<AppUser> userManager,IPasswordHasher<AppUser> passwordHasher, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        // GET: api/Profile
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<JobSeekercs>>> GetJobSeekercs()
        {
            return await _context.JobSeekercs.ToListAsync();
        }*/

        // GET: api/Profile/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetJobSeekercs(string id)
        {
            var jobSeekercs = from s in  _context.JobSeekercs select s;
            var data = jobSeekercs.Where(s => s.IdentityId.Equals(id));
            var user = await _context.Users.FindAsync(id);
            var response = new
            {
                jobSeeker = data,
                usuario = user
            };
            var json = JsonConvert.SerializeObject(data);


            if (json == null)
            {
                return NotFound();
            }

            return new OkObjectResult(json);
        }

        // PUT: api/Profile/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobSeekercs(string id, RegistrationViewModel model)
        {
            if (!UsersExists(id))
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //_context.Entry(jobSeekercs).State = EntityState.Modified;


            var jobSeekercs = from s in _context.JobSeekercs select s;
            var jobseeks = jobSeekercs.Where(s => s.IdentityId.Equals(id)).FirstOrDefault();
            AppUser use = await _userManager.FindByIdAsync(id);
            use.FirstName = model.FirstName;
            use.LastName = model.LastName;    
            if (model.Password != "nochange")
            {
                use.PasswordHash = _passwordHasher.HashPassword(use, model.Password);
            }
            jobseeks.Location = model.Location;
            jobseeks.IdentityId = id;
            jobseeks.Id = jobseeks.Id;
            IdentityResult result = await _userManager.UpdateAsync(use);
            _context.Entry(jobseeks).State = EntityState.Modified;   


            if (result.Succeeded) { 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            }
            else
            {
                return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            }

            return NoContent();
        }

        // POST: api/Profile
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<JobSeekercs>> PostJobSeekercs(JobSeekercs jobSeekercs)
        {
            _context.JobSeekercs.Add(jobSeekercs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobSeekercs", new { id = jobSeekercs.Id }, jobSeekercs);
        }

        // DELETE: api/Profile/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobSeekercs>> DeleteJobSeekercs(int id)
        {
            var jobSeekercs = await _context.JobSeekercs.FindAsync(id);
            if (jobSeekercs == null)
            {
                return NotFound();
            }

            _context.JobSeekercs.Remove(jobSeekercs);
            await _context.SaveChangesAsync();

            return jobSeekercs;
        }

        private bool JobSeekercsExists(int id)
        {
            return _context.JobSeekercs.Any(e => e.Id == id);
        }
        private bool UsersExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
