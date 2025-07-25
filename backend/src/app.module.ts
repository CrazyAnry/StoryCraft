import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/deffault/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { HelpersModule } from './modules/deffault/helpers/helpers.module';
import { AuthModule } from './modules/deffault/auth/auth.module';
import { BcryptModule } from './modules/deffault/bcrypt/bcrypt.module';
import { StoriesModule } from './modules/stories/stories.module';
import { ScenesModule } from './modules/scenes/scenes.module';
import { ChoicesModule } from './modules/choices/choices.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './modules/images/images.module';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    HelpersModule,
    BcryptModule,
    StoriesModule,
    ScenesModule,
    ChoicesModule,
    ImagesModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
