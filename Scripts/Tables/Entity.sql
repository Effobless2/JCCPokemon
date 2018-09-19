CREATE TABLE Entity(
	EntityId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	PokedexNumber int,
	ImageUrl nvarchar(max),
	EntityTypeId UNIQUEIDENTIFIER,
	FOREIGN KEY (EntityTypeId) REFERENCES EntityType(TypeId)
)