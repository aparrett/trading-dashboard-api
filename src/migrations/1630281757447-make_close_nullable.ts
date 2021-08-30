import {MigrationInterface, QueryRunner} from "typeorm";

export class makeCloseNullable1630281757447 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE trade ALTER COLUMN close DROP NOT NULL;
            ALTER TABLE trade ALTER COLUMN "closeDate" DROP NOT NULL;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE trade ALTER COLUMN close SET NOT NULL;
            ALTER TABLE trade ALTER COLUMN "closeDate" SET NOT NULL;
        `)
    }
}
