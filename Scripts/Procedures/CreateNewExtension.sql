
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Deboffle Maxime
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE CreateNewExtension 
	-- Add the parameters for the stored procedure here
	@ExtensionId UNIQUEIDENTIFIER = NULL,
	@EnglishName nvarchar(max),
	@FrenchName nvarchar(max),
	@Logo nvarchar(max),
	@Symbol nvarchar(max),
	@IdBloc UNIQUEIDENTIFIER
AS
BEGIN
	if @IdBloc is not null
		if @ExtensionId is null
			INSERT INTO Extension(FrenchName, EnglishName, LogoUrl, SymbolUrl, BlocId) VALUES (@FrenchName, @EnglishName, @Logo, @Symbol, @IdBloc)
		else
			INSERT INTO Extension(ExtensionId, FrenchName, EnglishName, LogoUrl, SymbolUrl, BlocId) VALUES (@ExtensionId, @FrenchName, @EnglishName, @Logo, @Symbol, @IdBloc)
END
GO
