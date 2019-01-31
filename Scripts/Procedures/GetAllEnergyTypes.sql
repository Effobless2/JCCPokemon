SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Maxime Deboffle
-- Create date: 17/01/2019
-- Description:	Returns all EnergyTypes
-- =============================================
CREATE PROCEDURE GetAllEnergyTypes
AS
BEGIN
	SELECT
		TypeId,
		FrenchName,
		EnglishName,
		Logo
	FROM EnergyType
END
GO
