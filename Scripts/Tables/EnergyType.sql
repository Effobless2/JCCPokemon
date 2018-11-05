CREATE TABLE EnergyType(
	TypeId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	EnglishName nvarchar(max),
	FrenchName nvarchar(max),
	Logo nvarchar(max)
)