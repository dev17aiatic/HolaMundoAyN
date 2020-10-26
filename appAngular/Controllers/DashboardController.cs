using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appAngular.Controllers
{
    
    [Route("[controller]")]
    [Authorize]
    public class DashboardController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
