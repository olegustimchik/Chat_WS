import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, Relation } from "typeorm";

import { UserChatEntity }                                                    from "./userChat.entity";

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
