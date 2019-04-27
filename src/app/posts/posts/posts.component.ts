import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article, MutipleArticle } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  article: MutipleArticle;
  article$: Observable<MutipleArticle>;
  article2$: Observable<Article[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => {
      this.article = data;
    });

    this.article$ = this.articleService.getArticles();

    this.article2$ = this.articleService.getArticles().pipe(
      map(data => data.articles)
    );
  }

}
