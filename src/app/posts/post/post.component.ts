import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map, shareReplay, switchMap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article, SingleArticle } from '../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  article: SingleArticle;

  article$: Observable<Article>;
  article2$: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    // method 1
    this.route.paramMap.subscribe(param => {
      // console.log(param.get('slug'));
      const slug = param.get('slug');

      this.articleService.getArticle(slug).subscribe(data => {
        this.article = data;
      });
    });

    // method 2
    this.route.paramMap.subscribe(param => {
      const slug = param.get('slug');

      this.article$ = this.articleService
        .getArticle(slug)
        .pipe(map(data => data.article));
    });

    // method 3
    this.article2$ = this.route.paramMap.pipe(
      map(param => param.get('slug')),
      delay(3000), // PM 叫我改慢一點
      switchMap(slug => this.articleService.getArticle(slug)),
      map(data => data.article),
      shareReplay(1)
    );
  }

  refresh() {
    // 想要再次取得資料時，重新產生新的 observable
    this.article2$ = this.route.paramMap.pipe(
      map(param => param.get('slug')),
      switchMap(slug => this.articleService.getArticle(slug)),
      map(data => data.article),
      shareReplay(1)
    );
  }
}
