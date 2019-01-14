﻿using System;
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
using JCCP.PokemonConnector;
using JCCP.CardConnector;

namespace JCCPokemon.Controllers
{
    public class HomeController : Controller
    {

        private readonly IAuthentificationService _authentificationService;
        private readonly IBlocService _blocService;
        private readonly IExtensionService _extensionService;
        private readonly IPokemonService _pokemonService;
        private readonly ICardService _cardService;

        public HomeController(IAuthentificationService service,
                              IBlocService blocService,
                              IExtensionService extService,
                              IPokemonService pokemonService,
                              ICardService cardService)
        {
            _authentificationService = service;
            _blocService = blocService;
            _extensionService = extService;
            _pokemonService = pokemonService;
            _cardService = cardService;
        }

        public async Task<IActionResult> Index()
        {
            await _cardService.CreateNewCard();
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
