﻿using System;
using System.Collections.Generic;
using System.Text;

namespace JCCP.BO
{
    public class Extension
    {
        public Guid ExtensionId { get; set; }
        public string FrenchName { get; set; }
        public string EnglishName { get; set; }
        public string LogoUrl { get; set; }
        public string ImageUrl { get; set; }
        public Guid BlocId { get; set; }
    }
}
