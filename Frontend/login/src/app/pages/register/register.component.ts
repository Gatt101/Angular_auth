import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
userForm!:FormGroup;
  errorMessage: string ="";
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Value:', this.userForm.value);

      this.http.post('http://localhost:8080/register', this.userForm.value, {
        headers: { 'Content-Type': 'application/json' },
      }).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized: Invalid credentials.';
          } else if (error.status === 0) {
            this.errorMessage = 'Server not reachable.';
          } else {
            this.errorMessage = 'An error occurred.';
          }
          console.error('Error:', error);
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
