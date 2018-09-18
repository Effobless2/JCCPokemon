CREATE TABLE UserHas(
	CollectorId UNIQUEIDENTIFIER,
	CardFormatId UNIQUEIDENTIFIER,
	number int,
	PRIMARY KEY (CollectorId, CardFormatId),
	FOREIGN KEY (CollectorId) REFERENCES Collector(IdCollector),
	FOREIGN KEY (CardFormatId) REFERENCES CardFormat(CardFormatId)
)