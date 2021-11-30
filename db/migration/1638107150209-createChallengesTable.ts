import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createChallengesTable1638107150209 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const challengesTable = new Table({
      name: 'challenges',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar',
          length: '150'
        },
        {
          name: 'is_visible',
          type: 'boolean'
        },
        {
          name: 'start_at',
          type: 'varchar'
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['created', 'running', 'canceled', 'completed']
        },
        {
          name: 'guild_id',
          type: 'varchar',
          length: '30'
        },
        {
          name: 'owner_id',
          type: 'varchar',
          length: '30'
        },
        {
          name: 'duration',
          type: 'int'
        },
        {
          name: 'target',
          type: 'int',
          isNullable: true
        },
        {
          name: 'target_type',
          type: 'enum',
          enum: ['items', 'lines', 'minutes', 'pages', 'words'],
          isNullable: true
        },
        {
          name: 'chain_war_id',
          type: 'int',
          isNullable: true
        },
        {
          name: 'channels',
          type: 'varchar',
          length: '30',
          isArray: true
        },
        {
          name: 'challenge_type',
          type: 'enum',
          enum: ['war', 'race']
        },
        {
          name: 'created_at',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'updated_at',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'canceled_at',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'completed_at',
          type: 'varchar',
          isNullable: true
        }
      ]
    })

    await queryRunner.createTable(challengesTable, true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('challenges')
  }
}
