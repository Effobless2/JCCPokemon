-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Deboffle Maxime
-- Description:	Insert a new Pokemon on the database
-- =============================================
CREATE PROCEDURE CreateNewPokemon 
	-- Add the parameters for the stored procedure here
	@PokemonId UNIQUEIDENTIFIER = NULL,
	@NumPokedex int,
	@EnglishName nvarchar(max),
	@FrenchName nvarchar(max),
	@ImageUrl nvarchar(max)
AS
BEGIN
	if @PokemonId is not null
		INSERT INTO Pokemon(PokemonId, NumPokedex, FrenchName, EnglishName, ImageUrl) VALUES (@PokemonId, @NumPokedex, @FrenchName, @EnglishName, @ImageUrl)
	else
		INSERT INTO Pokemon(NumPokedex, FrenchName, EnglishName, ImageUrl) VALUES (@NumPokedex, @FrenchName, @EnglishName, @ImageUrl)
END
GO
