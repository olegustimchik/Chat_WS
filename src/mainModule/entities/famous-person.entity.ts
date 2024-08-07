import { UserChatEntity }                                                    from "@/mainModule/entities/user-chat.entity";
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, Relation } from "typeorm";

@Entity("famousPerson")
export class FamousPersonEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 256 })
  @Index("famous_people_idx")
  name!: string;

  @Column({ type: "varchar", length: 256 })
  description!: string;

  @OneToOne(() => UserChatEntity, userChat => userChat.famousPerson)
  userChat!: Relation<UserChatEntity>;
}
