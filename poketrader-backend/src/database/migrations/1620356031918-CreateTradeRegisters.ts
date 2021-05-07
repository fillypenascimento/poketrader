import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTradeRegisters1620356031918
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trade_registers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'trade_id',
            type: 'uuid',
          },
          {
            name: 'pokemon_id',
            type: 'uuid',
          },
          {
            name: 'old_owner_id',
            type: 'uuid',
          },
          {
            name: 'new_owner_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'trade_registers',
      new TableForeignKey({
        name: 'RelatedTrade',
        columnNames: ['trade_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'trades',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trade_registers',
      new TableForeignKey({
        name: 'TradedPokemon',
        columnNames: ['pokemon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pokemons',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trade_registers',
      new TableForeignKey({
        name: 'OldPokemonOwner',
        columnNames: ['old_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trade_registers',
      new TableForeignKey({
        name: 'NewPokemonOwner',
        columnNames: ['new_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trade_registers', 'NewPokemonOwner');

    await queryRunner.dropForeignKey('trade_registers', 'OldPokemonOwner');

    await queryRunner.dropForeignKey('trade_registers', 'TradedPokemon');

    await queryRunner.dropForeignKey('trade_registers', 'RelatedTrade');

    await queryRunner.dropTable('trade_registers');
  }
}
