import { FamousPersonEntity } from "@/mainModule/entities/famous-person.entity";
import { FamousPerson }       from "@/mainModule/types/famous-person";
import { Injectable }         from "@nestjs/common";

@Injectable()
export class FamousPersonDataMapper {
  toResponse(entity: FamousPersonEntity): FamousPerson {
    const { description, id, name } = entity;

    return {
      description, id, name,
    };
  }
}
