import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: string;

  @Column()
  roleId: number;
}
