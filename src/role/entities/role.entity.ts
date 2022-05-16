import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
// import { Exclude } from 'class-transformer';

@Entity('role')
export class Role {
  /**
   * 角色id
   */
  @PrimaryGeneratedColumn()
  id: string;
  /**
   * 角色名称
   */
  @Column({ length: 100, comment: '角色名称' })
  name: string;
  /**
   * 是否激活
   */
  @Column({ default: 1, comment: '状态 1:启用 0:禁用' })
  status: number;
  /**
   * 描述
   */
  @Column({ length: 100, comment: '描述' })
  desc: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createTime: Date;
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  updateTime: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
