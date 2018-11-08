using System;
using System.Collections.Generic;
using System.Text;

namespace JCCP.BO
{
    public class Pokemon
    {
        public Guid PokemonId { get; set; }
        public int NumPokedex { get; set; }
        public string FrenchName { get; set; }
        public string EnglishName { get; set; }
        public string ImageUrl { get; set; }
    }
}
