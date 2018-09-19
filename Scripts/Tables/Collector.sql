CREATE TABLE Collector(
	IdCollector UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	LoginCollector NVARCHAR(max),
	PasswordCollector NVARCHAR(max)
)