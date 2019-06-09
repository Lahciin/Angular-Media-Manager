import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  apiUrl = 'url';

  constructor(
    private http: HttpClient) { }

  // get all media
  // get("/api/v1/media")
  getMedia(page, limit, type, reason?): Observable<any> {
    let url = this.apiUrl + 'media?page=' + page + '&limit=' + limit;
    if (type) {
      url += '&mimeType=' + type;
    }
    if (reason) {
      url += '&reason.for=' + reason;
    }
    return this.http.get(url);
  }

  // post("/api/v1/media") => to upload files
  uploadMedia(formData: FormData): Observable<any> {

    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post(this.apiUrl + 'media', formData, { headers: httpHeaders });
  }

  // delete("/api/v1/media") => to upload files
  deleteMedia(_id): Observable<any> {
    return this.http.delete(this.apiUrl + 'media/' + _id);
  }

}
