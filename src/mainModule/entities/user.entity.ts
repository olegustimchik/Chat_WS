import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, Relation } from "typeorm";

import { UserChatEntity }                                                                       from "./userChat.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar", length: 320, unique: true,
  })
  @Index("user_email_idx")
  email!: string;

  @Column({ type: "varchar", length: 256 })
  password!: string;

  @Column({
    type: "varchar", length: 60, unique: true,
  })
  @Index("user_ref_idx")
  referralCode!: string;

  @Column({ type: "int" })
  questionLeft!: number;

  @Column({ type: "boolean" })
  subscribed!: boolean;

  @Column({ type: "timestamp" })
  nextPayment!: string;

  @CreateDateColumn()
  createdAt!: string;

  @OneToMany(() => UserChatEntity, userChat => userChat.user)
  userChat!: Relation<Array<UserChatEntity>>;
}
