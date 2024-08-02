import { FamousPersonEntity } from "@/mainModule/entities/famous-person.entity";
import { Injectable }         from "@nestjs/common";
import { InjectRepository }   from "@nestjs/typeorm";
import { Repository }         from "typeorm";

@Injectable()
export class FamousPersonService {
  constructor(@InjectRepository(FamousPersonEntity) private readonly famousPersonRepository: Repository<FamousPersonEntity>) { }

  async getById(id: number):Promise<FamousPersonEntity> {
    const famousPerson = await this.famousPersonRepository.findOne({ where: { id } });

    return famousPerson;
  }

  async getAll(skip: number | undefined, take: number | undefined): Promise<Array<FamousPersonEntity>> {
    return await this.famousPersonRepository.find({ skip, take });
  }
}
