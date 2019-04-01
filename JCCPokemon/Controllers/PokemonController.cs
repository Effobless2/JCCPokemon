using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JCCP.BO;
using JCCP.PokemonConnector;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IPokemonService _pokemonService;

        public PokemonController(IHostingEnvironment hostingEnvironment, IPokemonService pokemonService)
        {
            _hostingEnvironment = hostingEnvironment;
            _pokemonService = pokemonService;
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpPost("CreateNewPokemon")]
        public async Task<ActionResult> CreateNewPokemon([FromForm(Name = "PokemonImage")] List<IFormFile> PokemonImage, [FromForm] string FrenchName, [FromForm] string EnglishName, [FromForm] string NumPokedex)
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
    }
}