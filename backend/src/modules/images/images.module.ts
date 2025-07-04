import { Module } from "@nestjs/common";
import { HelpersModule } from "../deffault/helpers/helpers.module";
import { PrismaModule } from "../deffault/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { ImagesCrudController } from "./controllers/images-crud.controller";
import { ImagesCrudService } from "./services/images-crud.service";
@Module({
  imports: [HelpersModule, PrismaModule, ConfigModule],
  controllers: [ImagesCrudController],
  providers: [ImagesCrudService],
})
export class ImagesModule {}
