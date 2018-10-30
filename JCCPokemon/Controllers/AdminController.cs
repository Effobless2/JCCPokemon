using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JCCP.BlocConnector;
using JCCP.BO;
using JCCP.ExtensionConnector;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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

        public AdminController(
            IBlocService blocService, 
            IExtensionService extensionService,
            IHostingEnvironment hostingEnvironment
            )
        {
            _blocService = blocService;
            _extensionService = extensionService;
            _hostingEnvironment = hostingEnvironment;
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

        [HttpPost]
        public async Task<ActionResult> CreateNewExtension(List<IFormFile> logo, List<IFormFile> symbol, string frenchName, string englishName, Guid blocId)
        {
            string symbolUri = SendSymbol(symbol);
            string logoUri = SendLogo(logo);
            Extension e = new Extension()
            {
                LogoUrl = logoUri,
                ImageUrl = symbolUri,
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

        public string SendSymbol(List<IFormFile> files)
        {
            string baseDirectory = "images\\symbol";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Count == 1 && files[0].Length > 0)
            {
                using (Stream stream = files[0].OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, files[0].FileName + "." + files[0].ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, files[0].FileName + "." + files[0].ContentType.Split('/').Last());
                    }
                }
            }

            return uri;
        }

        public string SendLogo(List<IFormFile> files)
        {
            string baseDirectory = "images\\logo";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Count == 1 && files[0].Length > 0)
            {
                using (Stream stream = files[0].OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, files[0].FileName + "." + files[0].ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, files[0].FileName + "." + files[0].ContentType.Split('/').Last());
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