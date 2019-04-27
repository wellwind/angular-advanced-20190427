import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MutipleArticle, SingleArticle } from './post';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<MutipleArticle> {
    return this.httpClient.get<MutipleArticle>(
      'http://localhost:3000/api/articles'
    );
  }

  getArticle(slug: string): Observable<SingleArticle> {
    return this.httpClient.get<SingleArticle>(`http://localhost:3000/api/articles/${slug}`);
  }
}
