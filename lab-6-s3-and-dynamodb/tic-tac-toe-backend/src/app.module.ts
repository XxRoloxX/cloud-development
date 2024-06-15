import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresProviderModule } from './database/postgres/provider.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresProviderModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '../../.env',
    }),
    GameModule,
    AuthModule,
    StorageModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
