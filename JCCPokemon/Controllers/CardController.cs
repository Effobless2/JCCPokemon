using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JCCP.BO;
using JCCP.CardConnector;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ICardService _cardService;

        public CardController(
            IHostingEnvironment hostingEnvironment,
            ICardService cardService)
        {
            _hostingEnvironment = hostingEnvironment;
            _cardService = cardService;
        }

        [HttpPost("CreateNewCard")]
        [Authorize(Policy = "IsAdmin")]
        public async Task<Guid> CreateNewCard([FromForm] string EnglishName,
                                              [FromForm] string FrenchName,
                                              [FromForm] Guid rarityId,
                                              [FromForm] Guid extensionId,
                                              [FromForm] string numCard,
                                              [FromForm] string maxNum,
                                              [FromForm(Name = "imageCard")] IFormFile imageCard)
        {
            Guid guid = Guid.NewGuid();
            string url = SendImage(imageCard, guid.ToString().Substring(0, 5));
            await _cardService.CreateNewCard(new Card() {
                CardId = guid,
                FrenchName = FrenchName,
                EnglishName = EnglishName,
                RarityId = rarityId,
                ExtensionId = extensionId,
                CardNumber = numCard,
                MaxIndex = maxNum,
                ImageUrl = url
                });
            return guid;
        }

        public string SendImage(IFormFile files, string name)
        {
            string baseDirectory = "images\\cards";
            if (!Directory.Exists(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory)))
                Directory.CreateDirectory(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory));

            string uri = "";
            if (files.Length > 0)
            {
                using (Stream stream = files.OpenReadStream())
                {
                    using (var fileStream = System.IO.File.Create(Path.Combine(_hostingEnvironment.WebRootPath, baseDirectory, name + "." + files.ContentType.Split('/').Last())))
                    {
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.CopyTo(fileStream);
                        uri = Path.Combine(baseDirectory, name + "." + files.ContentType.Split('/').Last());
                    }
                }
            }

            return uri;
        }
    }
}