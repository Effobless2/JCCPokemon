CREATE TABLE Extension(
	ExtensionId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	LogoUrl nvarchar(max),
	SymbolUrl nvarchar(max),
	BlocId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Bloc(BlocId)
)