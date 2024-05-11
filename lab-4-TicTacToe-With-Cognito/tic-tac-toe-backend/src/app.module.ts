import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { MovesModule } from './game/moves/moves.module';
import { PostgresProviderModule } from './database/postgres/provider.module';
import { AuthModule } from './auth/auth.module';
// import { WsGuard } from './auth/guards/ws.guard';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PostgresProviderModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '../../.env',
    }),
    MovesModule,
    AuthModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
