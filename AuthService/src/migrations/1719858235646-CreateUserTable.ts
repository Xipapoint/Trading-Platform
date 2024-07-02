import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1719858235646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "hashedPassword",
                    type: "varchar"
                },
                {
                    name: "shortAccessCode",
                    type: "varchar",
                    length: "4"
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "role",
                    type: "varchar",
                    default: "'USER'"
                },
                {
                    name: "age",
                    type: "int"
                },
                {
                    name: "createdAt",
                    type: "timestamptz",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamptz",
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
