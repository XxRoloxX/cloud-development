import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { MovesModule } from './game/moves/moves.module';
import { PostgresProviderModule } from './database/postgres/provider.module';

@Module({
  imports: [
    PostgresProviderModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '../../.env',
    }),
    GameModule,
    MovesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
