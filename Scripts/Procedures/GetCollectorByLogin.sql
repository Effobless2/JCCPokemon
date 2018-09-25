-- =============================================
-- Author:		DEBOFFLE MAxime
-- Create date: <Create Date,,>
-- Description:	Returns all Collectors in Database Where LoginCollector equals @login
-- =============================================
ALTER PROCEDURE GetCollectorByLogin
	-- Add the parameters for the stored procedure here
	@login nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT IdCollector, LoginCollector
	FROM Collector
	WHERE (LoginCollector = @login)
END
GO
