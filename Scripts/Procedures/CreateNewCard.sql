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
-- Author:		Maxime Deboffle
-- Create date: 14/01/2019
-- Description:	Creates a New Card into the database
-- =============================================
CREATE PROCEDURE CreateNewCard 
	-- Add the parameters for the stored procedure here
	@CardId UNIQUEIDENTIFIER = NULL, 
	@RarityId UNIQUEIDENTIFIER,
	@TypeId UNIQUEIDENTIFIER,
	@ImageUrl nvarchar(max),
	@FrenchName nvarchar(max),
	@EnglishName nvarchar(max),
	@PokemonId UNIQUEIDENTIFIER,
	@CardNumber nvarchar(max),
	@MaxIndex nvarchar(max)
AS
BEGIN
	if @CardId is not null
		INSERT INTO 
			PokemonCard(
				CardId, 
				RarityId, 
				TypeId, 
				ImageUrl, 
				FrenchName, 
				EnglishName, 
				PokemonId, 
				CardNumber, 
				MaxIndex
			)
		VALUES(
			@CardId,
			@RarityId,
			@TypeId,
			@ImageUrl,
			@FrenchName,
			@EnglishName,
			@PokemonId,
			@CardNumber,
			@MaxIndex
		)
	else
		INSERT INTO 
			PokemonCard(
				RarityId, 
				TypeId, 
				ImageUrl, 
				FrenchName, 
				EnglishName, 
				PokemonId, 
				CardNumber, 
				MaxIndex
			)
		VALUES(
			@RarityId,
			@TypeId,
			@ImageUrl,
			@FrenchName,
			@EnglishName,
			@PokemonId,
			@CardNumber,
			@MaxIndex
		)
		
END
GO
