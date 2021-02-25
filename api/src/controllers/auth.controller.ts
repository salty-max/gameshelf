import { Application } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor(private app: Application) {
    this.authService = new AuthService();
    this.routes();
  }

  public routes() {
    this.app.route('/auth/register').post(this.authService.register);
  }
}