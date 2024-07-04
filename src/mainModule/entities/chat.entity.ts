import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";

import { UserChatEntity }                                                          from "./userChat.entity";

@Entity("chat")
export class ChatEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "varchar", length: 100 })
  role!: string;

  @Column({ type: "varchar", nullable: false })
  userChatID!: string;

  @ManyToOne(() => UserChatEntity, userChat => userChat.chat)
  @JoinColumn({ name: "userChatID" })
  userChat!: Relation<UserChatEntity>;
}
