import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresProviderModule } from './database/postgres/provider.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostgresProviderModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '../../.env',
    }),
    GameModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
