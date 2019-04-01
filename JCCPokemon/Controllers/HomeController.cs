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
using EnergyTypeConnector;
using JCCP.RarityConnector;
using JCCP.FormatConnector;

namespace JCCPokemon.Controllers
{
    public class HomeController : Controller
    {

        private readonly IAuthentificationService _authentificationService;
        private readonly IBlocService _blocService;
        private readonly IExtensionService _extensionService;
        private readonly IPokemonService _pokemonService;
        private readonly ICardService _cardService;
        private readonly IEnergyTypeService _energyTypeService;
        private readonly IRarityService _rarityService;
        private readonly IFormatService _formatService;

        public HomeController(IAuthentificationService service,
                              IBlocService blocService,
                              IExtensionService extService,
                              IPokemonService pokemonService,
                              ICardService cardService,
                              IEnergyTypeService energyTypeService,
                              IRarityService rarityService,
                              IFormatService formatService)
        {
            _authentificationService = service;
            _blocService = blocService;
            _extensionService = extService;
            _pokemonService = pokemonService;
            _cardService = cardService;
            _energyTypeService = energyTypeService;
            _rarityService = rarityService;
            _formatService = formatService;
        }

        public async Task<IActionResult> Index()
        {
            bool res = await _formatService.CreateNewFormat(new Format() { EnglishName = "testEn", FrenchName = "testFR" });
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
