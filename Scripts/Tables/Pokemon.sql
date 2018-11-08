CREATE TABLE Pokemon (
	PokemonId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	NumPokedex int,
	FrenchName NVARCHAR(max),
	EnglishName NVARCHAR(max),
	ImageUrl nvarchar(max)
)