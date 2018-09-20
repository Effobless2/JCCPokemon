using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JCCP.AuthentificationConnector;
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
        public async Task Connection(string login, string password)
        {
            string res = await _authentificationService.UserAuthentification(login, password);
        }
    }
}