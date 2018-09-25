-- =============================================
-- Author:		DEBOFFLE Maxime
-- Create date: <Create Date,,>
-- Description:	Creating a new Collector
-- =============================================
ALTER PROCEDURE CreateNewCollector 
	-- Add the parameters for the stored procedure here
	@userName nvarchar(max),
	@password nvarchar(max)
AS
	
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @newid UNIQUEIDENTIFIER = NEWID();

	INSERT INTO Collector(IdCollector, LoginCollector, PasswordCollector) VALUES (@newid, @userName, @password);

	SELECT IdCollector, LoginCollector
	FROM Collector
	WHERE (IdCollector = @newid)

END
GO
