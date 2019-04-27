import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleTitleExist } from './post';

@Injectable({
  providedIn: 'root'
})
export class TitleValidatorService {
  constructor(private httpClient: HttpClient) {}

  titleExist(title: string): Observable<ArticleTitleExist> {
    return this.httpClient.get<ArticleTitleExist>(
      `http://localhost:3000/api/articles/title-exist/${encodeURIComponent(
        title
      )}`
    );
  }

  titleExistValidator(control: AbstractControl): Observable<ArticleTitleExist> {
    return this.titleExist(control.value);
  }
}
