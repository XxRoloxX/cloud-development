import { Injectable } from '@nestjs/common';
import { ScanCommand, ScanCommandInput, GetItemCommand, DynamoDBClient, PutItemCommand, PutItemCommandInput, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Result, ResultResponseDto } from './dto/result.dto';
import { GameStatus } from 'src/common/game';

class DynamoDBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DynamoDBError';
  }
}

@Injectable()
export class DynamodbService {
  private readonly client: DynamoDBClient;
  private readonly tableName: string;

  constructor() {
    this.client = new DynamoDBClient({ region: 'us-east-1' });
    this.tableName = process.env.DYNAMODB_TABLE_NAME;
  }

  // TODO: Decouple the DynamoDBClient from the resultStore
  public async createResult(result: Result): Promise<void> {
    const putItemCommand: PutItemCommandInput = {
      TableName: this.tableName,
      Item: {
        'GameId': { S: result.gameId.toString() },
        'Player1Id': { S: result.player1Id },
        'Player2Id': { S: result.player2Id },
        'Result': { S: result.result }
      },
    };

    try {
      await this.client.send(new PutItemCommand(putItemCommand));
    } catch (error) {
      throw new DynamoDBError(`Error creating record: ${error.message}`);
    }
  }

  public async countResults(results: Result[]): Promise<ResultResponseDto> {
    const player1Wins = results.filter((result) => result.result === "PLAYER1_WON").length;
    const player2Wins = results.filter((result) => result.result === "PLAYER2_WON").length;
    const draws = results.filter((result) => result.result === "DRAW").length;

    return {
      player1Wins: player1Wins + draws,
      player2Wins: player2Wins + draws
    }
  }


  public async getPreviousResults(player1Id: string, player2Id: string): Promise<Result[]> {
    const previoudResultsCommand: ScanCommandInput = {
      TableName: this.tableName,
      FilterExpression: "Player1Id = :Player1Id AND Player2Id = :Player2Id",
      ExpressionAttributeValues: {
        ":Player1Id": { S: player1Id },
        ":Player2Id": { S: player2Id },
      }

    };

    try {
      const rawResults = await this.client.send(new ScanCommand(previoudResultsCommand));
      const results: Result[] = rawResults.Items.map((item) => {
        return {
          gameId: item["GameId"].S,
          player1Id: item["Player1Id"].S,
          player2Id: item["Player2Id"].S,
          result: item["Result"].S as any
        }
      })

      return results;

    } catch (error) {
      throw new DynamoDBError(`Error fetching previous results: ${error.message}`);
    }
  }
}
