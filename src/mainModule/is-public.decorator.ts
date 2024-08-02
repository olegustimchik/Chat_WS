import { SetMetadata } from "@nestjs/common";

export const IsPublic = () => SetMetadata("isPublic", true);
// export const IsPublic = Reflector.createDecorator<boolean>();
