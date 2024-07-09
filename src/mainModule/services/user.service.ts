import { EnvsVariables }    from "@/core/env-constants";
import { UserEntity }       from "@/mainModule/entities/user.entity";
import { HashService }      from "@/mainModule/services/hash.service";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private hashService: HashService) { }

  async saveUser(email: string, password: string, salt: string, name: string = null): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = email;
    user.password = this.hashService.hash(password, salt);
    user.name = name;
    user.passwordSalt = salt;

    return await this.userRepository.save(user);
  }

  async createReferralCode(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("This user not exists"); // create error class and handler for this case
    }
    user.referralCode = this.hashService.hash(user.id, EnvsVariables.REFERRAL_SALT);

    return await this.userRepository.save(user);
  }

  async findUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async findUserByReferralCode(code) : Promise<UserEntity> {
    return await this.userRepository.findOneBy({ referralCode: code });
  }

  async updateQuestionsByReferral(referralCode: string) : Promise<UserEntity> {
    const isUser = await this.findUserByReferralCode(referralCode);

    if (isUser) {
      isUser.questionLeft += 5;

      return await this.userRepository.save(isUser);
    }

    return null;
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async saveGoogleAuthUser(email: string, externalID: string) {
    return this.userRepository.save({
      email, externalID, externalType: "GOOGLE",
    });
  }
}
