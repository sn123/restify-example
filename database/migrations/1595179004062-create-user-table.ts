import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1595179004062 implements MigrationInterface {
    private _table = 'user';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this._table,
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        length: '48',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '64',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '128',
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                    },
                ],
            }),
            true,
        );
        await queryRunner.query(
            `ALTER TABLE ${this._table} CHANGE created_at created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE ${this._table} CHANGE updated_at updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        // await queryRunner.query(
        //     'ALTER TABLE ' +
        //         this._table +
        //         ' CHANGE `created_at` `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP',
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ${this._table}`);
    }
}
