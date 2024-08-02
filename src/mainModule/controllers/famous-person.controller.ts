import { FamousPersonDataMapper }       from "@/mainModule/data-mappers/famous-person.data-mapper";
import { FamousPersonAllRequest }       from "@/mainModule/dto/famous-person.dto";
import { FamousPersonService }          from "@/mainModule/services/famous-person.service";
import { Controller, Body, Get, Param } from "@nestjs/common";

@Controller("famousPerson")
export class FamousPersonController {
  constructor(private famousPersonService: FamousPersonService, private famousPersonDataMapper: FamousPersonDataMapper) { }

  @Get("all")
  async getAll(@Body() body: FamousPersonAllRequest) {
    const famousPersons = await this.famousPersonService.getAll(body.start, body.take);

    return { individuals: famousPersons.map(individual => this.famousPersonDataMapper.toResponse(individual)) };
  }

  @Get("byId/:id")
  async getById(@Param("id") id: number) {
    const individual = await this.famousPersonService.getById(id);

    return { individual: this.famousPersonDataMapper.toResponse(individual) };
  }
}
