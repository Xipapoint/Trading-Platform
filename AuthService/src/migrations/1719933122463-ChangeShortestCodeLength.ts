import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeShortestCodeLength1719933122463 implements MigrationInterface {
    name = 'ChangeShortestCodeLength1719933122463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("user", "shortAccessCode", new TableColumn({
            name: "shortAccessCode",
            type: "varchar",
            length: "255"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("user", "shortAccessCode", new TableColumn({
            name: "shortAccessCode",
            type: "varchar",
            length: "4"
        }));
    }

}
