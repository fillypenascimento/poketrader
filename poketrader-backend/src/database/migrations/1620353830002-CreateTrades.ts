import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTrades1620353830002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trades',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'from_player_id',
            type: 'uuid',
          },
          {
            name: 'to_player_id',
            type: 'uuid',
          },
          {
            name: 'fair_trade',
            type: 'boolean',
          },
          {
            name: 'fairness_rate',
            type: 'decimal',
            precision: 3,
            scale: 2,
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
      'trades',
      new TableForeignKey({
        name: 'TradeRequestedFromPlayer',
        columnNames: ['from_player_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trades',
      new TableForeignKey({
        name: 'TradeRequestedToPlayer',
        columnNames: ['to_player_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'players',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trades', 'TradeRequestedToPlayer');

    await queryRunner.dropForeignKey('trades', 'TradeRequestedFromPlayer');

    await queryRunner.dropTable('trades');
  }
}
