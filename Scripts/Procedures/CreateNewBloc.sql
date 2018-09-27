SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Deboffle Maxime
-- Create date: <Create Date,,>
-- Description:	Creating a New Bloc inside of the Database
-- =============================================
ALTER PROCEDURE CreateNewBloc
	-- Add the parameters for the stored procedure here
	@EnglishName nvarchar(max),
	@FrenchName nvarchar(max), 
	@ImageUrl nvarchar(max),
	@CreationYear date

AS
BEGIN
	INSERT INTO Bloc(EnglishName, FrenchName, ImageUrl, CreationYear) VALUES (@EnglishName, @FrenchName, @ImageUrl, @CreationYear)
END
GO

