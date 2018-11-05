CREATE TABLE Rarity(
	RarityId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	Logo nvarchar(max)
)