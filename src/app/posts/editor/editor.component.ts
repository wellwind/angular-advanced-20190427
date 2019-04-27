import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('hello'),
    body: new FormControl('test'),
    tags: new FormArray([
      new FormControl('Angular'),
      new FormControl('React'),
      new FormControl('Vue')
    ])
  });

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  constructor() {}

  ngOnInit() {}

  submit() {
    console.log(this.form.value);
  }

  addTags(tagInput: HTMLInputElement) {
    tagInput.value.split(',')
      .map(tagName => tagName.trim())
      .filter(tagName => !!tagName)
      .filter(tagName => (this.tags.value as string[]).indexOf(tagName) === -1)
      .forEach(tagName => {
        this.tags.push(new FormControl(tagName));
      });
    tagInput.value = '';
    tagInput.focus();
  }
}
