CREATE TABLE Extension(
	ExtensionId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	FrenchName nvarchar(max),
	EnglishName nvarchar(max),
	LogoUrl nvarchar(max),
	ImageUrl nvarchar(max),
	BlocId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Bloc(BlocId)
)