using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JCCP.BlocConnector;
using JCCP.BO;
using JCCP.ExtensionConnector;
using JCCP.FormatConnector;
using JCCP.PokemonConnector;
using JCCP.RarityConnector;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    public class AdminController : Controller
    {
        private readonly IBlocService _blocService;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IExtensionService _extensionService;
        private readonly IPokemonService _pokemonService;
        private readonly IRarityService _rarityService;
        private readonly IFormatService _formatService;

        public AdminController(
            IBlocService blocService, 
            IExtensionService extensionService,
            IHostingEnvironment hostingEnvironment,
            IPokemonService pokemonService,
            IRarityService rarityService,
            IFormatService formatService
            )
        {
            _blocService = blocService;
            _extensionService = extensionService;
            _hostingEnvironment = hostingEnvironment;
            _pokemonService = pokemonService;
            _rarityService = rarityService;
            _formatService = formatService;
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
                    new Claim(ClaimTypes.Name, login),
                    new Claim(ClaimTypes.Role, "admin")
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return RedirectToAction("Index");
            }
            return RedirectToAction("Authentification");
        }
    }
}