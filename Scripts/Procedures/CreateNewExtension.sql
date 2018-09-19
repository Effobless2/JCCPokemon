
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Deboffle Maxime
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE CreateNewExtension 
	-- Add the parameters for the stored procedure here
	@EnglishName nvarchar(max),
	@FrenchName nvarchar(max),
	@Logo nvarchar(max),
	@Img nvarchar(max),
	@IdBloc UNIQUEIDENTIFIER
AS
BEGIN
	if @IdBloc is not null
		INSERT INTO Extension(FrenchName, EnglishName, LogoUrl, ImageUrl, BlocId) VALUES (@FrenchName, @EnglishName, @Logo, @Img, @IdBloc)
END
GO
