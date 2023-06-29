import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from 'src/app/core/services/tickets.service';
@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.css']
})
export class CreateTicketsComponent {
  TicketFormGroup: FormGroup;

  constructor(private toastr: ToastrService, private ticketService: TicketsService) { 
    this.TicketFormGroup = new FormGroup({
      email: new FormControl('', {
        updateOn: 'submit',
        validators: [
          Validators.required,
          Validators.pattern( '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
        ],
      }),
      ticketDescription: new FormControl('', {
        updateOn: 'submit',
        validators:[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ]

      }),
    });

  }
  emailFEValidation = false;
  ticketDescriptionFEValidation = false;

  ValidationFE() {
    if (this.TicketFormGroup.controls['email'].invalid) {
      this.emailFEValidation = true;
    } else {
      this.emailFEValidation = false;
    }
    if (this.TicketFormGroup.controls['ticketDescription'].invalid) {
      this.ticketDescriptionFEValidation = true;
    } else {
      this.ticketDescriptionFEValidation = false;
    }
    return this.emailFEValidation, this.ticketDescriptionFEValidation;
  }

  onSubmit() {
    const userId = localStorage.getItem('userBookingAppId');
    if (this.TicketFormGroup.invalid) {
      // alert('Please fill all the required fields');ValidationFE()
      this.ValidationFE();

      // return this.userRegisterForm.controls['email'].errors
    } else {
      const data = {
        "applicationUserId" : userId ,
        "ticketDescription": `Email from ${this.TicketFormGroup.value.email} and says that ${this.TicketFormGroup.value.ticketDescription}`
      }
      this.emailFEValidation = false;
      this.ticketDescriptionFEValidation = false;
      this.ticketService.createUserTicket(data).subscribe(
        (res) => {
          this.toastr.success('Ticket Created Successfully', 'Success');
          this.TicketFormGroup.reset();
        }
      );


  }
}

  // {
  //   "applicationUserId": "string",
  //   "ticketDescription": "string"
  // }
}
