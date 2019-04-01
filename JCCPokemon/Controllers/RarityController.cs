using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JCCP.BO;
using JCCP.RarityConnector;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RarityController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IRarityService _rarityService;

        public RarityController(
            IHostingEnvironment hostingEnvironment, 
            IRarityService rarityService)
        {
            _hostingEnvironment = hostingEnvironment;
            _rarityService = rarityService;
        }

        [HttpGet("default")]
        public  string Index()
        {
            return "Hello";
        }
        
        [Authorize(Policy = "IsAdmin")]
        [HttpPost("CreateNewRarity")]
        public async Task<ActionResult> CreateNewRarity([FromForm] string frenchName, [FromForm] string englishName, [FromForm (Name = "logo")] IFormFile logo)
        {
            Guid id = Guid.NewGuid();
            Rarity rarity = new Rarity()
            {
                RarityId = id,
                FrenchName = frenchName,
                EnglishName = englishName,
                Logo = SendRarityImage(logo, id.ToString().Substring(0, 5))
            };

            bool res = await _rarityService.CreateNewRarity(rarity);
            if (res)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

        public string SendRarityImage(IFormFile file, string name)
        {
            string baseDirectory = "images\\rarity";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (file != null & file.Length > 0)
            {
                using (Stream stream = file.OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, name + "." + file.ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, name + "." + file.ContentType.Split('/').Last());
                    }
                }
            }
            return uri;
        }
    }
}