ALTER TABLE CardFormat
    ADD CONSTRAINT DF_CardFormatId DEFAULT newsequentialid() FOR CardFormatId
	
ALTER TABLE Collector
    ADD CONSTRAINT DF_IdCollector DEFAULT newsequentialid() FOR IdCollector

ALTER TABLE EnergyType
    ADD CONSTRAINT DF_TypeId DEFAULT newsequentialid() FOR TypeId

ALTER TABLE Entity
    ADD CONSTRAINT DF_EntityId DEFAULT newsequentialid() FOR EntityId

ALTER TABLE EntityType
    ADD CONSTRAINT DF_TypeId DEFAULT newsequentialid() FOR TypeId

ALTER TABLE FormatType
    ADD CONSTRAINT DF_TypeId DEFAULT newsequentialid() FOR TypeId

ALTER TABLE PokemonCard
    ADD CONSTRAINT DF_CardId DEFAULT newsequentialid() FOR CardId

ALTER TABLE Rarity
    ADD CONSTRAINT DF_RarityId DEFAULT newsequentialid() FOR RarityId