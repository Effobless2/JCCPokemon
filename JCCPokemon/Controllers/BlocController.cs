using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JCCP.BlocConnector;
using JCCP.BO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JCCPokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlocController : ControllerBase
    {
        private readonly IBlocService _blocService;

        public BlocController(
            IBlocService blocService)
        {
            _blocService = blocService;
        }

        [HttpPost("CreateNewBloc")]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult> CreateNewBloc([FromBody]Bloc newBloc)
        {
            if (newBloc.FrenchName != null && newBloc.EnglishName != null && newBloc.Year > 1994 && newBloc.Year < DateTime.Now.Year + 1)
            {
                await _blocService.CreateNewBloc(newBloc);
                return Ok();
            }
            return NotFound();
        }

        [HttpGet("GetAllBlocs")]
        public async Task<List<Bloc>> GetAllBlocs()
        {
            return await _blocService.GetAllBlocs();
        }

        
    }
}