import { GenericDto }           from "@/core/abstracts/generic.dto";
import { Expose }               from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FamousPersonAllRequest extends GenericDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  start: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  take: number;
}
