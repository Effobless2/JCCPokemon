CREATE TABLE EnergyType(
	TypeId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	EnglishName nvarchar(max),
	FrenchName nvarchar(max),
	Logo nvarchar(max)
)