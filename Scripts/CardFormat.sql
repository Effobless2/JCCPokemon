CREATE TABLE CardFormat(
	CardFormatId UNIQUEIDENTIFIER PRIMARY KEY,
	FormatId UNIQUEIDENTIFIER,
	CardId UNIQUEIDENTIFIER,
	FOREIGN KEY (FormatId) REFERENCES FormatType(TypeId),
	FOREIGN KEY (CardId) REFERENCES PokemonCard(CardId)
)