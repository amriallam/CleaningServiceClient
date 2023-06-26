import { Component } from '@angular/core';
import { ConfirmEmailService } from 'src/app/core/services/confirm-email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent {
  constructor(
    private confirmEmailService: ConfirmEmailService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  userId!: string;
  token!: string;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.token = params['token'];
      console.log(this.userId);
      console.log(this.token);

      this.confirmEmailService.ConfirmEmail(this.userId, this.token).subscribe(
        (data) => {
          console.log(data);
          // this.toastr.success('Email Confirmed Successfully');
        });
        // this.toastr.success('Email Confirmed Successfully');
      
    });
  }
}
