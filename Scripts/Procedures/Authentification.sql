
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Authentify User with Login and Password
-- =============================================
CREATE PROCEDURE Authentification 
	-- Add the parameters for the stored procedure here
	@Login nvarchar(max), 
	@Password nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *
	FROM Collector
	Where( LoginCollector = @Login and PasswordCollector = @Password)
END
GO

