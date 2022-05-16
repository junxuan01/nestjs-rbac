import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  /**
   * id
   */
  @PrimaryGeneratedColumn()
  id: string;
  /**
   * 用户名
   */
  @Column({ length: 100 })
  name: string;
  /**
   * 密码
   */
  @Exclude()
  @Column()
  password: string;
  /**
   * 邮箱
   */
  @Exclude({})
  @Column({
    default: 'xx@qq.com',
  })
  mail: string;
  /**
   * 头像
   */
  @Column({ default: '' })
  avatar: string;
  /**
   * 是否激活
   */
  @Column({ default: true })
  isActive: boolean;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    console.log('GENERATE');
    this.password = hashSync(this.password, 10);
  }
}
