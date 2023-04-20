import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestConfigurationService } from '../test-configuration.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { CommonMethod } from '../../../libraries/common-method';
import { ToastrService } from 'ngx-toastr';


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
  optionErrorMessage : any ; 
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
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router : Router 
  ) {
    this.editor = new Editor({});
    this.myForm = this.fb.group({
      question: [null, [Validators.required]],
      options: this.fb.array([]),
      points: [1, [Validators.required]],
      negativePoints: [0, [Validators.required]],
      optionChoice : [1, [Validators.required]]
    });

    this.route.params.subscribe(params => {
      const id = params['questionId'];
      if (id == "new_question") {
        this.question_data = this.testConfigurationService.newQuestion;
        this.question_data.options.forEach((element) => {
          this.optionEditorArray.push(new Editor);
          this.options.push(this.fb.group(
            { optionText: [null, [Validators.required]], correct: [false, [Validators.required]] }
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
      this.toastr.error('Atlease two options are required');
    }
  }

  optionChecked(event, index) {
    if( this.myForm.get("optionChoice").value == 1){
      if (event.target.checked) {
        let arrayValue = [];
  
        Object.keys(this.options).forEach(
          (value, i) => {
  
            if (index == i) {
  
              arrayValue.push({ correct: true });
            }
  
            arrayValue.push({ correct: false });
  
          }
        )
        this.options.patchValue(arrayValue);
      }
    }

    // check if error message is there or not. 
    let selectedOptionArray = this.options.value.filter(elem => elem.correct == true );
    if(selectedOptionArray.length > 0){
      this.optionErrorMessage = null ; 
    }
  }

  isOptionSelected(){
    let selectedOptionArray = this.options.value.filter(elem => elem.correct == true );
    if(selectedOptionArray.length == 0 ){
      this.optionErrorMessage = "Select any options";
      return false ; 
    }
    return true; 
  }

  resetOptions(){
    let arrayValue = [];
    Object.keys(this.options).forEach(
      (value) => {
        arrayValue.push({ correct: false });
      }
    )
    this.options.patchValue(arrayValue);
  }

  addOptions() {
    if (this.optionEditorArray.length < 8) {
      this.optionEditorArray.push(new Editor);
      this.options.push(this.fb.group(
        { optionText: [null, [Validators.required]], correct: [false, [Validators.required]] }
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
    let optionValid = this.isOptionSelected() ; 
    if(CommonMethod.isFormValid(this.myForm) && optionValid ){
      let id = Math.floor(Math.random() * 100000000);
      this.testConfigurationService.questions.push({...this.myForm.value, "id" : id}); 
      console.log({...this.myForm.value, "id" : id});
      setTimeout(() => {

        if(btnType == "save"){
          this.router.navigate(["../../"], { relativeTo: this.route });
        }
        else{
          this.router.navigate(["../../"], { queryParams: { redirect : true } ,  relativeTo: this.route});
        }
      }, 2000);
    }
  }
}
