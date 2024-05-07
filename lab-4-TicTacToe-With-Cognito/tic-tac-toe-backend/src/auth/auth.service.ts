import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  private userPool: CognitoIdentityProviderClient;

  constructor() {
    this.userPool = new CognitoIdentityProviderClient({ region: 'us-east-1' });
  }

  async signUp(email: string, password: string) {
    // Implement the signUp method
  }




}
