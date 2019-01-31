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
	@Logo nvarchar(max),
	@Id  UNIQUEIDENTIFIER = NULL OUTPUT
AS
BEGIN
	if @RarityId is null
		SET @RarityId = NEWID();
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
	SELECT @Id = @RarityId

END
GO
