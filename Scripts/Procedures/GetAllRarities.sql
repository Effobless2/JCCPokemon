SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Maxime Deboffle
-- Create date: 17/01/2019
-- Description:	Selects all Rarities
-- =============================================
CREATE PROCEDURE GetAllRarities
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		RarityId,
		FrenchName,
		EnglishName,
		Logo
	FROM Rarity
END
GO
