using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

using Library.Models;
using Library.Auth;

namespace Library.Controllers
{
    public class Result
    {
        public bool Sucess { get; set; }
        public string Token { get; set; }

        public Result(bool suc)
        { Sucess = suc; }

        public Result(bool suc, string token)
        { 
            Sucess = suc;
            Token = token;
        }

    }


    [ApiController]
    public class AuthController : ControllerBase
    {
        [AcceptVerbs("POST", "OPTIONS")]
        [Route("login")]
        public async Task<Result> Login([FromBody] UserInfo info)
        {
            using (var dc = new BooksContext())
            {
                var user = dc.Users.Where(n => n.Email == info.email && n.Password == info.password).FirstOrDefault();
                if (user != null)
                {

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString())
                    };
                    ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);

                    var now = DateTime.UtcNow;
                    var jwt = new JwtSecurityToken(
                             issuer: AuthOptions.ISSUER,
                             audience: AuthOptions.AUDIENCE,
                             notBefore: now,
                             expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                             signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                    return new Result(true, encodedJwt);
                }
            }
            return new Result(false);
        }
    }
}
