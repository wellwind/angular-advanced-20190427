import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { Article } from '../post';
import { TitleValidatorService } from '../title-validator.service';

// const reuqiredAndMin10 = Validators.compose([Validators.required, Validators.minLength(10)]);

// @Injectable()
// export class NameExistValidatorService {

//   nameExist = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//     return this.httpClient.get(`http://localhost:3000/api/user/exist/${control.value}`).pipe(
//       map(data => data)
//     );
//   }

//   constructor(private httpClient: HttpClient) {
//   }

//   nameExist2(name: string) {
//     return this.httpClient.get(`http://localhost:3000/api/user/exist/${name}`).pipe(
//       map(data => data)
//     );
//   }
// }

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  titleExist$: Observable<boolean>;

  reuqiredAndMin10 = Validators.compose([
    Validators.required,
    Validators.minLength(10)
  ]);

  form = new FormGroup({
    title: new FormControl('hello', [Validators.required]),
    // 加入非同步驗證器
    // title: new FormControl(
    //   'hello',
    //   [Validators.required],
    //   this.titleValidatorService.titleExistValidator.bind(
    //     this.titleValidatorService
    //   )
    // ),
    body: new FormControl('test', this.reuqiredAndMin10),
    tags: new FormArray([
      new FormControl('Angular'),
      new FormControl('React'),
      new FormControl('Vue')
    ])
  });

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private titleValidatorService: TitleValidatorService
  ) {}

  ngOnInit() {
    // 訂閱 valueChanges / statusChanges 事件
    this.form.valueChanges.subscribe(data => console.log(data));
    this.form.get('title').valueChanges.subscribe(data => console.log(data));
    this.form.get('title').statusChanges.subscribe(data => console.log(data));

    // 簡單的 valueChanges 事件應用
    this.titleExist$ = this.form.get('title').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(value => this.titleValidatorService.titleExist(value)),
      map(validation => validation.titleExist)
    );
  }

  submit() {
    console.log(this.form.value);
    this.articleService
      .createArticle({ article: this.form.value })
      .subscribe((article: Article) => {
        this.router.navigateByUrl(`/post/${article.slug}`);
      });
  }

  addTags(tagInput: HTMLInputElement) {
    tagInput.value
      .split(',')
      .map(tagName => tagName.trim())
      .filter(tagName => !!tagName)
      .filter(tagName => (this.tags.value as string[]).indexOf(tagName) === -1)
      .forEach(tagName => {
        this.tags.push(new FormControl(tagName));
      });
    tagInput.value = '';
    tagInput.focus();
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }
}
