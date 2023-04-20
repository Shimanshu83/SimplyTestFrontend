import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { AdminService } from '../../admin.service';
import { TestConfigurationService } from '../test-configuration.service';
import { CommonMethod }  from '../../../libraries/common-method';
@Component({
  selector: 'app-test-basic-setting',
  templateUrl: './test-basic-setting.component.html',
  styleUrls: ['./test-basic-setting.component.scss']
})
export class TestBasicSettingComponent implements OnInit, OnDestroy {

  testForm: FormGroup;

  editor: Editor;
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



  constructor(private fb: FormBuilder, private adminService: AdminService , private testConfigurationService : TestConfigurationService) { }

  ngOnInit(): void {

    this.createForm();
    this.editor = new Editor();
  }

  createForm() {
    this.testForm = this.fb.group({
      testName: ['', Validators.required],
      testCode: ['', Validators.required],
      description: ['', Validators.required],
      termsCondition: ['', Validators.required]
    });
  }

  onSubmit() {
    CommonMethod.isFormValid(this.testForm); 
    console.log(this.testForm.value);
    this.testConfigurationService.testState.next('basicSettingDone');
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
