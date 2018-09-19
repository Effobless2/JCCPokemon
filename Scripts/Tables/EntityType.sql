CREATE TABLE EntityType(
	TypeId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	Logo nvarchar(max)
)