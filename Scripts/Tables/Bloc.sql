CREATE TABLE Bloc(
	BlocId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	CreationYear int
)