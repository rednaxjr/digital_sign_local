import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = {};

  constructor(private http: HttpClient) { }
  async loadConfig(): Promise<void> {
    try {
      const args = (window as any).process?.argv || [];
      const configArg = args.find((arg: string) => arg.startsWith('--config='));

      if (configArg) {
        this.config = JSON.parse(configArg.replace('--config=', ''));
      } else {
        this.config = await firstValueFrom(
          this.http.get('assets/config.json')
        );
      }
      console.log("this is the config in config.service: " + this.config)
    } catch (error) {
      console.error('Config load failed:', error);

      this.config = { apiUrl: 'https://stech.wheba-services.net/digital-signature/api' };
      console.log("this is the config in config.service when its else: " + this.config)
    }
  }

  get apiUrl(): string {
    return this.config['apiUrl'];
  }

  get uploadDir(): string {
    return this.config['upload_dir'];
  }
}