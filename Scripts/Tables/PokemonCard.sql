CREATE TABLE PokemonCard(
	CardId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
	EntityId UNIQUEIDENTIFIER,
	RarityId UNIQUEIDENTIFIER,
	TypeId UNIQUEIDENTIFIER,
	ImageUrl nvarchar(max),
	ExtensionId UNIQUEIDENTIFIER,
	FOREIGN KEY (ExtensionId) REFERENCES Extension(ExtensionId)
	FOREIGN KEY (EntityId) REFERENCES Entity(EntityId),
	FOREIGN KEY (RarityId) REFERENCES Rarity(RarityId),
	FOREIGN KEY (TypeId) REFERENCES EnergyType(TypeId)
)