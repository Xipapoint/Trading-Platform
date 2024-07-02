import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokensTable1719939474591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tokens',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'userId',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'refreshToken',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tokens');
    }
}
