SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Maxime Deboffle
-- Create date: 17/01/2019
-- Description:	Adds a new Rarity in the database
-- =============================================
CREATE PROCEDURE CreateNewRarity
	-- Add the parameters for the stored procedure here
	@RarityId UNIQUEIDENTIFIER = NULL,
	@FrenchName nvarchar(max),
	@EnglishName nvarchar(max),
	@Logo nvarchar(max)
AS
BEGIN
	DECLARE @curId UNIQUEIDENTIFIER = @RarityId;
	if @RarityId is null
		SET @curId = NEWID();
	INSERT INTO Rarity(
		RarityId,
		FrenchName,
		EnglishName,
		Logo
	) VALUES (
		@curId,
		@FrenchName,
		@EnglishName,
		@Logo
	)

END
GO
