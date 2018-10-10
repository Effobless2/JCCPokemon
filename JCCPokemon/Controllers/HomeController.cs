using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JCCPokemon.Models;
using JCCP.AuthentificationConnector;
using JCCP.BlocConnector;
using JCCP.BO;
using JCCP.ExtensionConnector;

namespace JCCPokemon.Controllers
{
    public class HomeController : Controller
    {

        private readonly IAuthentificationService _authentificationService;
        private readonly IBlocService _blocService;
        private readonly IExtensionService _extensionService;

        public HomeController(IAuthentificationService service,
                              IBlocService blocService,
                              IExtensionService extService)
        {
            _authentificationService = service;
            _blocService = blocService;
            _extensionService = extService;
        }

        public async Task<IActionResult> Index()
        {
            string test = await _extensionService.GetAllExtensions();
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
