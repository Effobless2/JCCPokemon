using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JCCP.BO;
using JCCP.FormatConnector;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormatController : ControllerBase
    {
        private readonly IFormatService _formatService;

        public FormatController(
            IFormatService formatService
        )
        {
            _formatService = formatService;
        }

        [Authorize(Policy = "IsAdmin")]
        [HttpPost("CreateNewFormat")]
        public async Task<ActionResult> CreateNewFormat([FromForm] string FrenchName, [FromForm] string EnglishName)
        {
            bool res = await _formatService.CreateNewFormat(new Format() { FrenchName = FrenchName, EnglishName = EnglishName });
            if (res)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}