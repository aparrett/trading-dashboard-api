import { MigrationInterface, QueryRunner } from 'typeorm'

export class intColsToDecimal1626914167883 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE trade 
                ALTER COLUMN entry type DECIMAL,
                ALTER COLUMN close type DECIMAL
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE trade 
                ALTER COLUMN entry type INT4,
                ALTER COLUMN close type INT4
        `)
    }
}
