import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth_codes')
export class AuthCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, name: 'email' })
    email: string;

    @Column({ type: 'varchar', nullable: false, name: 'code' })
    code: string;

    @Column({ type: 'boolean', default: false, name: 'is_redeemed' })
    isRedeemed: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
} 