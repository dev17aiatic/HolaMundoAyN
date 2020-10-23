using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using appAngular.viewIdentity;
using System.Text;
using System.Security.Claims;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
using appAngular.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace appAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult Login([FromBody]CredentialsViewModel model)
        {
            // Tu código para validar que el usuario ingresado es válido

            // Asumamos que tenemos un usuario válido
            var user = new AppUser
            {
                UserName = "Eduardo",
                Email = "admin@kodoti.com",
                //UserId = "a79b2e64-a4de-4f3a-8cf6-a68ba400db24"
            };

            // Leemos el secret_key desde nuestro appseting
            var secretKey = _configuration.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes(secretKey);

            // Creamos los claims (pertenencias, características) del usuario
            /*var claims = new[]
            {
             new Claim("UserData", JsonConvert.SerializeObject(user)),
            new Claim(ClaimTypes.NameIdentifier, user.UserId),
            new Claim(ClaimTypes.Email, user.Email)
        };*/

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new Claim[]{
                 new Claim(ClaimTypes.NameIdentifier, user.UserName),
                     new Claim(ClaimTypes.Email, user.Email)
                });
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                // Nuestro token va a durar un día
                Expires = DateTime.UtcNow.AddDays(1),
                // Credenciales para generar el token usando nuestro secretykey y el algoritmo hash 256
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var tokenFinal = tokenHandler.WriteToken(createdToken);

            return new OkObjectResult (tokenFinal);
        }
    }
}
