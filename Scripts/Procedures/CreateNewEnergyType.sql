use JCCPokemon
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Maxime Deboffle
-- Create date: 14/01/2019
-- Description:	Creates a new Pokemon Type
-- =============================================
ALTER PROCEDURE CreateNewEnergyType 
	-- Add the parameters for the stored procedure here
	@TypeId UNIQUEIDENTIFIER = NULL output,
	@EnglishName nvarchar(max),
	@FrenchName nvarchar(max),
	@Logo nvarchar(max)
AS
BEGIN
	if @TypeId is null
		BEGIN
			SET @TypeId = NEWID();
		END
	INSERT INTO EnergyType(
		TypeId,
		EnglishName,
		FrenchName,
		Logo
	) VALUES (
		@TypeId,
		@EnglishName,
		@FrenchName,
		@Logo
	);
END
GO
