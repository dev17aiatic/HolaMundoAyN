using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appAngular.Identity;
using appAngular.Data;
using appAngular.viewIdentity;
using Microsoft.AspNetCore.Identity;
using appAngular.helpers;
using AutoMapper;

namespace appAngular.Controllers
{
    
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public DashboardController(UserManager<AppUser> userManager, IMapper mapper, ApplicationDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
