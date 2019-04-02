using System;
using System.Collections.Generic;
using System.Text;

namespace JCCP.BO
{
    public class Card
    {
        public Guid CardId { get; set; }
        public string ImageUrl { get; set; }
        public string EnglishName { get; set; }
        public string FrenchName { get; set; }
        public string CardNumber { get; set; }
        public string MaxIndex { get; set; }

        public Guid RarityId { get; set; }
        public Guid PokemonId { get; set; }
        public Guid ExtensionId { get; set; }

    }
}
