CREATE TABLE FormatType(
	TypeId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	EnglishName nvarchar(max),
	FrenchName nvarchar(max)
) 