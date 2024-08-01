import { GenericDto } from "@/core/abstracts/generic.dto";
import { Expose }     from "class-transformer";
import { IsNumber }   from "class-validator";

export class UserChatRequest extends GenericDto {
  @Expose()
  @IsNumber()
  famousPersonId: number;
}
