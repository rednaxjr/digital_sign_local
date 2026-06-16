import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment.prod';
import { ConfigService } from '../config/config.service';

interface PdfFile {
  name: string;
  path: string;
  status?: number;
  signatureCount?: number;
}

declare global {
  interface Window {
    electronAPI: {
      listPdfs: (folderPath: string) => Promise<any[]>;
      readPdf: (filePath: string) => Promise<string>;
    };
  }
}
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = `${this.configService.apiUrl}/file`;
  headers = {
    headers: new HttpHeaders().set('Content-Type', "application/json")
  }

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }
  // get_files(data: any) {
  //   return this.httpClient.post(this.url + "/get_files", data, this.headers)
  // }

  // get_files2() {
  //   return this.httpClient.post(this.url + "/get_files", this.headers)
  // }

  async get_files2(): Promise<PdfFile[]> {
    const folder = this.configService.uploadDir;
    return window.electronAPI.listPdfs(folder);
  }

  async readPdfAsBase64(filePath: string): Promise<string> {
    return window.electronAPI.readPdf(filePath);
  }

  uploadFile(formData: FormData): Observable<any> {
    const req = this.httpClient.post<HttpEvent<any>>(this.url + "/uploadFile", formData
      , {
        reportProgress: true,
        observe: 'events' as const,
        headers: new HttpHeaders(),
      }
    );
    return req;

  }
  get_signs() {
    return this.httpClient.get<any>(this.url + "/getAllFiles");
  }

  remove_signature(data: any) {
    return this.httpClient.post(this.url + "/delete_file", data, this.headers)
  }
  delete_folders(data: any) {
    console.log(data)
    return this.httpClient.post(this.url + "/delete-folders", data, this.headers)
  }
}
