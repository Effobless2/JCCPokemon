CREATE TABLE PokemonCard(
	CardId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	RarityId UNIQUEIDENTIFIER,
	TypeId UNIQUEIDENTIFIER,
	ImageUrl nvarchar(max),
	ExtensionId UNIQUEIDENTIFIER,
	CardNumber nvarchar(max),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	PokemonId UNIQUEIDENTIFIER,
	CardNumber nvarchar(max),
	MaxIndex nvarchar(max),
	FOREIGN KEY (ExtensionId) REFERENCES Extension(ExtensionId),
	FOREIGN KEY (RarityId) REFERENCES Rarity(RarityId),
	FOREIGN KEY (TypeId) REFERENCES EnergyType(TypeId),
	FOREIGN KEY (PokemonId) REFERENCES Pokemon(PokemonId)
)