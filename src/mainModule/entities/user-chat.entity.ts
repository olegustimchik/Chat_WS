import { ChatEntity }                                                                                          from "@/mainModule/entities/chat.entity";
import { FamousPersonEntity }                                                                                  from "@/mainModule/entities/famous-person.entity";
import { UserEntity }                                                                                          from "@/mainModule/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, JoinColumn, ManyToOne, Relation, OneToOne } from "typeorm";

@Entity("userChat")
export class UserChatEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  famousPersonID!: number;

  @Column({ type: "varchar" })
  @Index("user_id_idx")
  userID!: string;

  @Column({ type: "varchar" })
  chatID!: string;

  @OneToMany(() => ChatEntity, chat => chat.userChat)
  @JoinColumn({ name: "chatID" })
  chat!: Relation<Array<ChatEntity>>;

  @ManyToOne(() => UserEntity, user => user.userChat)
  @JoinColumn({ name: "userID", referencedColumnName: "id" })
  user!: Relation<UserEntity>;

  @OneToOne(() => FamousPersonEntity, famousPerson => famousPerson.userChat)
  @JoinColumn({ name: "famousPersonID" })
  famousPerson!: Relation<FamousPersonEntity>;
}
