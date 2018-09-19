Create TABLE Bloc(
	BlocId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	ImageUrl nvarchar(max)
)