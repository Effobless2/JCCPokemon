using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    public class AuthentificationController : Controller
    {
        [Route("Authentification")]
        [Route("Home/SignUp")]
        public IActionResult SignUp()
        {
            return View();
        }

        [Route("Authentification")]
        [Route("Home/SignIn")]
        public IActionResult SignIn()
        {
            return View();
        }
    }
}