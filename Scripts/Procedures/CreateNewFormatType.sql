
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
-- Create date: 01/04/2019
-- Description:	Creates a new Format
-- =============================================
Create PROCEDURE CreateNewFormatType
	-- Add the parameters for the stored procedure here
	@frenchName nvarchar(max),
	@englishName nvarchar(max)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	insert into FormatType(TypeId, FrenchName,EnglishName) values (NEWID(), @frenchName,@englishName)
END
GO
