import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.scss']
})
export class TestStartComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.myForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    console.log(this.myForm.value);
  }

}
