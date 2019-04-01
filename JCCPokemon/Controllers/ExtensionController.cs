using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JCCP.BO;
using JCCP.ExtensionConnector;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtensionController : ControllerBase
    {
        private readonly IExtensionService _extensionService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ExtensionController(
            IExtensionService extensionService,
            IHostingEnvironment hostingEnvironment)
        {
            _extensionService = extensionService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("CreateNewExtension")]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult> CreateNewExtension([FromForm (Name = "logo")] List<IFormFile> logo, [FromForm(Name = "symbol")] List<IFormFile> symbol, [FromForm] string frenchName, [FromForm] string englishName, [FromForm] Guid blocId)
        {
            Guid myguid = Guid.NewGuid();
            string symbolUri = SendSymbol(symbol, myguid.ToString().Substring(0, 5));
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
    }
}