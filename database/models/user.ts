import * as bcrypt from 'bcryptjs';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column({ select: false })
    public password: string;

    @CreateDateColumn({ name: 'created_at' })
    public created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updated_at: Date;

    public hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}
