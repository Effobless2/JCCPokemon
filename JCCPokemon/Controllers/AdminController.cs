using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using JCCP.BlocConnector;
using JCCP.BO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    public class AdminController : Controller
    {
        private readonly IBlocService _blocService;
        public AdminController(IBlocService blocService)
        {
            _blocService = blocService;
        }

        public async Task<IActionResult> Index()
        {
            if (HttpContext.User.Identity.Name != "Admin")
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return RedirectToAction("Authentification");
            }
            return View();
        }

        public IActionResult Authentification()
        {
            return View();
        }

        public async Task<IActionResult> Connection(string login, string password)
        {
            if (login == "Admin" && password == "route")
            {
                List<Claim> claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, login)
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return RedirectToAction("Index");
            }
            return RedirectToAction("Authentification");
        }
        
        [HttpPost]
        public async Task<ActionResult> CreateNewBloc([FromBody]Bloc newBloc)
        {

            if (newBloc.FrenchName != null && newBloc.EnglishName != null && newBloc.Year > 1994 && newBloc.Year < DateTime.Now.Year+1)
            {
                await _blocService.CreateNewBloc(newBloc);
                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<List<Bloc>> GetAllBlocs()
        {
            return await _blocService.GetAllBlocs();
        }
    }

}