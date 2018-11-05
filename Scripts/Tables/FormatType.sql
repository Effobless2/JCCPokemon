CREATE TABLE FormatType(
	TypeId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	EnglishName nvarchar(max),
	FrenchName nvarchar(max)
) 