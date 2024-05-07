import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { MovesModule } from './game/moves/moves.module';
import { PostgresProviderModule } from './database/postgres/provider.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostgresProviderModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '../../.env',
    }),
    GameModule,
    MovesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
