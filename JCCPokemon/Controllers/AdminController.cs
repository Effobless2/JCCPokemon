using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JCCP.BlocConnector;
using JCCP.BO;
using JCCP.ExtensionConnector;
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

        public AdminController(
            IBlocService blocService, 
            IExtensionService extensionService,
            IHostingEnvironment hostingEnvironment,
            IPokemonService pokemonService,
            IRarityService rarityService
            )
        {
            _blocService = blocService;
            _extensionService = extensionService;
            _hostingEnvironment = hostingEnvironment;
            _pokemonService = pokemonService;
            _rarityService = rarityService;
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
        
        [HttpPost]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult> CreateNewBloc([FromBody]Bloc newBloc)
        {

            if (newBloc.FrenchName != null && newBloc.EnglishName != null && newBloc.Year > 1994 && newBloc.Year < DateTime.Now.Year+1)
            {
                await _blocService.CreateNewBloc(newBloc);
                return Ok();
            }
            return NotFound();
        }

        [HttpPost]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult> CreateNewExtension(List<IFormFile> logo, List<IFormFile> symbol, string frenchName, string englishName, Guid blocId)
        {
            Guid myguid = Guid.NewGuid();
            string symbolUri = SendSymbol(symbol, myguid.ToString().Substring(0,5));
            string logoUri = SendLogo(logo, myguid.ToString().Substring(0, 5));
            Extension e = new Extension()
            {
                ExtensionId = myguid,
                LogoUrl = logoUri,
                SymbolUrl = symbolUri,
                FrenchName = frenchName,
                EnglishName = englishName,
                BlocId = blocId
            };

           bool result = await _extensionService.CreateNewExtension(e);
           if (result)
            {
                return Ok();
            }
            return NotFound();
        }

        public string SendSymbol(List<IFormFile> files, string name)
        {
            string baseDirectory = "images\\symbol";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Count == 1 && files[0].Length > 0)
            {
                using (Stream stream = files[0].OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, name + "." + files[0].ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, name + "." + files[0].ContentType.Split('/').Last());
                    }
                }
            }

            return uri;
        }

        public string SendLogo(List<IFormFile> files, string name)
        {
            string baseDirectory = "images\\logo";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Count == 1 && files[0].Length > 0)
            {
                using (Stream stream = files[0].OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, name + "." + files[0].ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, name + "." + files[0].ContentType.Split('/').Last());
                    }
                }
            }

            return uri;
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<ActionResult> CreateNewPokemon(List<IFormFile> PokemonImage, string FrenchName, string EnglishName, string NumPokedex)
        {
            int pokedexNumber;
            try
            {
                pokedexNumber = int.Parse(NumPokedex);
            }
            catch (Exception)
            {
                return NotFound();
            }
            Guid pokemonId = Guid.NewGuid();
            string urlImage = SendPokemonImage(PokemonImage, pokemonId.ToString().Substring(0, 5));
            Pokemon pokemon = new Pokemon()
            {
                PokemonId = pokemonId,
                FrenchName = FrenchName,
                EnglishName = EnglishName,
                ImageUrl = urlImage,
                NumPokedex = pokedexNumber

            };
            bool res = await _pokemonService.CreateNewPokemon(pokemon);
            if (res)
            {
                return Ok();
            }
            return NotFound();
        }

        public string SendPokemonImage(List<IFormFile> files, string name)
        {
            string baseDirectory = "images\\pokemons";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Count == 1 && files[0].Length > 0)
            {
                using (Stream stream = files[0].OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, name + "." + files[0].ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, name + "." + files[0].ContentType.Split('/').Last());
                    }
                }
            }

            return uri;
        }


        [Authorize(Policy = "IsAdmin")]
        [HttpPost]
        public async Task<ActionResult> CreateNewRarity(string frenchName, string englishName, List<IFormFile> logo)
        {
            Guid id = Guid.NewGuid();
            Rarity rarity = new Rarity() {
                RarityId = id,
                FrenchName = frenchName,
                EnglishName = englishName,
                Logo = SendRarityImage(logo, id.ToString().Substring(0,5))
            };
            
            bool res = await _rarityService.CreateNewRarity(rarity);
            if (res)
            {
                return Ok();
            } else
            {
                return NotFound();
            }

        }

        public string SendRarityImage(List<IFormFile> files, string name)
        {
            string baseDirectory = "images\\rarity";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Count == 1 && files[0].Length > 0)
            {
                using (Stream stream = files[0].OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, name + "." + files[0].ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, name + "." + files[0].ContentType.Split('/').Last());
                    }
                }
            }
            return uri;
        }

        [HttpGet]
        public async Task<List<Bloc>> GetAllBlocs()
        {
            return await _blocService.GetAllBlocs();
        }
    }
}