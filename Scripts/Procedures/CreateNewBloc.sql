SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Deboffle Maxime
-- Create date: <Create Date,,>
-- Description:	Creating a New Bloc inside of the Database
-- =============================================
CREATE PROCEDURE CreateNewBloc
	-- Add the parameters for the stored procedure here
	@EnglishName nvarchar(max),
	@FrenchName nvarchar(max), 
	@ImageUrl nvarchar(max)
AS
BEGIN
	INSERT INTO Bloc(EnglishName, FrenchName, ImageUrl) VALUES (@EnglishName, @FrenchName, @ImageUrl)
END
GO
