using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using JCCP.AuthentificationConnector;
using JCCP.BO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    public class AuthentificationController : Controller
    {
        private readonly IAuthentificationService _authentificationService;

        public AuthentificationController(IAuthentificationService authentificationService)
        {
            _authentificationService = authentificationService;
        }

        [Route("Authentification")]
        [Route("Authentification/SignUp")]
        public async Task<IActionResult> SignUp()
        {
            return View();
        }

        [Route("Authentification")]
        [Route("Authentification/SignIn")]
        public async Task<IActionResult> SignIn()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Connection(string login, string password)
        {
            Collector res = await _authentificationService.UserAuthentification(login, password);
            if (res == null)
            {
                return RedirectToAction("SignIn");
            }

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, login),
                new Claim(ClaimTypes.Authentication, res.CollectorId.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            return Redirect("/");

        }
        
        public async Task<IActionResult> Logout()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            }

            return Redirect("/");
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewAccount(string login, string password)
        {
            List<Collector> lc = await _authentificationService.GetAllCollectorByLogin(login);
            if (lc.Count == 0)
            {
                Collector c = await _authentificationService.CreateNewCollector(login, password);


                List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, login),
                new Claim(ClaimTypes.Authentication, c.CollectorId.ToString())
            };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return Redirect("/");
            }

            return RedirectToAction("SignUp");
            

        }
    }
}