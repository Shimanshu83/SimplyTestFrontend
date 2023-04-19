import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestConfigurationService } from '../test-configuration.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-test-single-question',
  templateUrl: './test-single-question.component.html',
  styleUrls: ['./test-single-question.component.scss']
})
export class TestSingleQuestionComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  question_data: any;
  editor: Editor;
  optionEditorArray: Editor[] = [];
  number = 0;
  editor2: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(
    private testConfigurationService: TestConfigurationService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.editor = new Editor();

    // so we need to create a new instance of editor class and supply them to the options object
    // this.editor2 = new Editor() ; 
    this.myForm = this.fb.group({
      question: [null, [Validators.required]],
      options: this.fb.array([]),
      points: [null, [Validators.required]],
      negativePoints: [null, [Validators.required]],
      selectedAnswers: [null, [Validators.required]]
    });

    this.route.params.subscribe(params => {
      const id = params['questionId'];
      if (id == "new_question") {
        this.question_data = this.testConfigurationService.newQuestion;
        this.question_data.options.forEach((element) => {
          this.optionEditorArray.push(new Editor);
          this.options.push(this.fb.group(
            { optionText: [null, [Validators.required]], correct: [null, [Validators.required]] }
          ));
        });

      }
    });
  }



  ngOnInit(): void {

  }

  get options() {
    return this.myForm.get('options') as FormArray;
  }

  deleteOption(index) {

    if (this.optionEditorArray.length > 2) {
      this.options.removeAt(index);
      this.optionEditorArray.splice(index, 1);
    }
    else {
      // will throw error in flash message showing that this is not allowed. 
    }
  }
  addOptions() {

    if (this.optionEditorArray.length < 8) {
      this.optionEditorArray.push(new Editor);
      this.options.push(this.fb.group(
        { optionText: [null, [Validators.required]], correct: [null, [Validators.required]] }
      ));
    }
    else{
      // throw error more than 8 options are not allowed after implementing flash message thanks
    }

  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(): void {
    console.log(this.myForm.value);
  }
}
