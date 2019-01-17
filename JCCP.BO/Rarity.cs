using System;
using System.Collections.Generic;
using System.Text;

namespace JCCP.BO
{
    public class Rarity
    {
        public Guid RarityId { get; set; } = Guid.Empty;
        public string FrenchName { get; set; }
        public string EnglishName { get; set; }
        public string Logo { get; set; }
    }
}
