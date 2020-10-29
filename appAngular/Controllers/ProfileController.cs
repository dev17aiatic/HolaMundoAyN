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
using appAngular.helpers;

namespace appAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;



        public ProfileController(ApplicationDbContext context, UserManager<AppUser> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
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
            var json = JsonConvert.SerializeObject(response);


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

            var userIdentity = _mapper.Map<AppUser>(model);
            var result = await _userManager.UpdateAsync(userIdentity);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            var jobseeks = _context.JobSeekercs.Where(x => x.IdentityId == id).ToList();
            jobseeks[0].Location = model.Location;


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
