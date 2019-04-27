import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, MutipleArticle, SingleArticle } from './post';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  endPoint = environment.api;

  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<MutipleArticle> {
    return this.httpClient.get<MutipleArticle>(
      `${this.endPoint}/api/articles`
    );
  }

  getArticle(slug: string): Observable<SingleArticle> {
    return this.httpClient.get<SingleArticle>(
      `http://localhost:3000/api/articles/${slug}`
    );
  }

  createArticle(article: SingleArticle): Observable<Article> {
    return this.httpClient.post<Article>(
      'http://localhost:3000/api/articles',
      article,
      {
        headers: { Authorization: `Token ${localStorage.getItem('token')}`}
      }
    );
  }
}
