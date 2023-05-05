import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestConfigurationService } from '../test-configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { CommonMethod } from '../../../libraries/common-method';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


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
  optionErrorMessage: any;
  editor2: Editor;
  editMode: boolean = false;
  questionId: string;
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

  questionCampaignId: any; // save the questionCampaign through which we will save the data 
  constructor(
    private testConfigurationService: TestConfigurationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.editor = new Editor({});
    this.myForm = this.fb.group({
      questionText: [null, [Validators.required]],
      options: this.fb.array([]),
      correctAnswerPoint: [1, [Validators.required]],
      incorrectAnswerPoint: [0, [Validators.required]],
      questionType: ['single', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      const id = params['questionId'];
      if (id == "new_question") {
        this.question_data = this.testConfigurationService.newQuestion;
        this.question_data.options.forEach((element) => {
          this.optionEditorArray.push(new Editor);
          this.options.push(this.fb.group(
            { optionText: [null, [Validators.required]], selected: [false, [Validators.required]] }
          ));
        });

      }
      else {
        this.questionId = id;
        let questionData = this.testConfigurationService.getQuestionById(this.questionId)[0];
        // this.myForm.patchValue(questionData) ; 
        this.patchQuestionData(questionData);
        this.editMode = true;

      }
    });
  }

  patchQuestionData(questionData) {
    // need to add value in two manner first add all the values except options 
    // then add options values 
    this.myForm.patchValue({
      questionText: questionData.questionText,
      correctAnswerPoint: questionData.correctAnswerPoint,
      incorrectAnswerPoint: questionData.incorrectAnswerPoint,
      questionType: questionData.questionType
    })

    for (let option of questionData.options) {
      this.optionEditorArray.push(new Editor());
      this.options.push(this.fb.group(
        { optionText: [option.optionText, [Validators.required]], selected: [option.selected, [Validators.required]] }
      ));
    }

  }



  ngOnInit(): void {

    this.testConfigurationService.questionCampaignIdData.subscribe(value => {
      this.questionCampaignId = value;
    })

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
      this.toastr.error('Atlease two options are required');
    }
  }

  optionChecked(event, index) {
    if (this.myForm.get("questionType").value == 'single') {
      if (event.target.checked) {
        let arrayValue = [];

        Object.keys(this.options).forEach(
          (value, i) => {

            if (index == i) {

              arrayValue.push({ selected: true });
            }

            arrayValue.push({ selected: false });

          }
        )
        this.options.patchValue(arrayValue);
      }
    }

    // check if error message is there or not. 
    let selectedOptionArray = this.options.value.filter(elem => elem.selected == true);
    if (selectedOptionArray.length > 0) {
      this.optionErrorMessage = null;
    }
  }

  isOptionSelected() {
    let selectedOptionArray = this.options.value.filter(elem => elem.selected == true);
    if (selectedOptionArray.length == 0) {
      this.optionErrorMessage = "Select any options";
      return false;
    }
    return true;
  }

  resetOptions() {
    let arrayValue = [];
    Object.keys(this.options).forEach(
      (value) => {
        arrayValue.push({ selected: false });
      }
    )
    this.options.patchValue(arrayValue);
  }

  addOptions() {
    if (this.optionEditorArray.length < 8) {
      this.optionEditorArray.push(new Editor);
      this.options.push(this.fb.group(
        { optionText: [null, [Validators.required]], selected: [false, [Validators.required]] }
      ));
    }
    else {
      this.toastr.error('More then 8 options are not allowed');
    }

  }


  ngOnDestroy(): void {
    // deleting all edior instances 
    this.editor.destroy();
    this.optionEditorArray.forEach(editor => {
      this.editor.destroy();
    })
  }

  onSubmit(btnType): void {
    let optionValid = this.isOptionSelected();
    if (CommonMethod.isFormValid(this.myForm) && optionValid) {

      if (this.editMode == true) {
        this.updateQuestion(this.myForm.value);
      }
      else {
        this.saveQuestion(this.myForm.value);
      }
      setTimeout(() => {

        if (btnType == "save") {
          this.router.navigate(["../../"], { relativeTo: this.route });
        }
        else {
          this.router.navigate(["../../"], { queryParams: { redirect: true }, relativeTo: this.route });
        }
      }, 500);


    }
  }

  saveQuestion(myFormValue) {
    // console.log(myFormValue);
    // throw new Error('asd');
    // let id = Math.floor(Math.random() * 100000000);
    console.log(this.questionCampaignId)
    this.httpClient.post<any>("/api/question-campaign/add-question", { ...myFormValue, questionCampaignId: this.questionCampaignId }).subscribe(data => {


      console.log(data)
      if (data.status == true) {
        this.testConfigurationService.questions.push(data.values);
        this.toastr.success("Question added successfully");

      }
      else {
        this.toastr.success("Something went wrong");

      }

    })

    return true
  }
  updateQuestion(myFormValue) {

    // find out the index of the questions in the element and update them directly 

    let questionIndex;
    this.testConfigurationService.questions.forEach((question, index) => {
      if (this.questionId = question.id) {
        questionIndex = index;
      }
    })

    this.testConfigurationService.questions[questionIndex] = { id: this.questionId, ...myFormValue };
    return
  }



}
