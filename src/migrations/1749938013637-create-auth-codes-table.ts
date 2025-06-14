import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthCodesTable1749938013637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "auth_codes",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                      },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "code",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "is_redeemed",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("auth_codes");
    }

}
