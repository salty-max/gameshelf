import { Application } from 'express';
import { PlatformService } from '../services/platform.service';

export class PlatformController {
  private platformService: PlatformService;

  constructor(private app: Application) {
    this.platformService = new PlatformService();
    this.routes();
  }

  public routes() {
    this.app.route('/platforms').get(this.platformService.getAllPlatforms);
    this.app.route('/platform').post(this.platformService.addPlatform);
    this.app.route('/platform/:id')
      .put(this.platformService.updatePlatform)
      .delete(this.platformService.deletePlatform);
  }
}