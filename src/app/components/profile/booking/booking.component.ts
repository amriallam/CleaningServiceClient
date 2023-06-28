import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingClient } from 'src/app/core/Models/BookingClient';
import { BookingStaus } from "src/app/core/Models/BookingStaus";
import { ClientBookingService } from 'src/app/core/services/ClientBooking.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/Payment.service';
import { ConfirmationPopupComponent } from 'src/app/core/components/confirmationPopup/confirmationPopup.component';
import { PopUpContent } from 'src/app/core/Models/PopUpContent';
import { PayOptionPopUpComponent } from 'src/app/core/components/PayOptionPopUp/PayOptionPopUp.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from '@auth0/angular-jwt';




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<BookingClient>;
  userId!: string ;
  decodedToken:any;
  encodedToken!:string;
  helper=new JwtHelperService();
  resultsLength!:number;
  

  displayedColumns: string[] = ['Date', 'Location', 'Service', 'Amount', 'Status', 'Pay', 'Cancel', 'Details'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private clientBookingService: ClientBookingService,
    private route: Router,
    private paymentService: PaymentService,
    private modalService: NgbModal
  ) { }
  public data!: BookingClient[]



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    const encodedToken = localStorage.getItem("userBookingAppToken");
    if (encodedToken !== null) {
      this.encodedToken = encodedToken;
      this.decodedToken=this.helper.decodeToken(this.encodedToken)
      this.userId = this.decodedToken.Id
    }else{
      this.route.navigate(['/login'])
    }
    this.clientBookingService.getAllClientBooking(this.userId).subscribe(data => {
      this.data = data.data
      this.resultsLength = this.data.length
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBookingStatusName(value: number): string {
    return BookingStaus[value]
  }

  bookingDetail(id: number) {
    this.route.navigate(['profile', 'booking-details', id])
  }

  ActivateActionPay(data: BookingClient): boolean {
    if (data.status === "Pending") {
      return true;
    } else {
      return false;
    }

  }

  ActivateActionCancel(data: BookingClient): boolean {

    if (data.status === "Pending" || data.status === "Confirmed") {
      return true;
    }
    return false;

  }

  ActivateActionRefund(data: BookingClient): boolean {
    if (data.status === "Confirmed") {
      return true;
    }
    return false;

  }
  pay(data: BookingClient) {
    this.openView2().closed.subscribe(res => {
      if (res.result) {
        this.paymentService.Pay(data.id, res.option).subscribe(res2 => {
          window.location.href=res2.data.result
        })
      }
    })
  }
  cancel(data: BookingClient) {
    this.openView().closed.subscribe((popRes: any) => {
      if (popRes.result) {
        this.paymentService.CancelBooking(data.id).subscribe(res => { 
            data.status= "Cancelled";
          })
      }
    })
  }
  refund(data: BookingClient) {
   let config = new PopUpContent("Are You Sure You Wont To Refund This Booking", "Yes", "No")
    this.openView(config).closed.subscribe(res => {
      if (res.result) {
        this.paymentService.Refund(data.id).subscribe(
          res => {
            data.status = "Cancelled";    
            console.log(res);
          },
          error => {
            console.log(error);  
          }
        );
      }
    })
  }

  openView(data?: PopUpContent):NgbModalRef {
    let config
    if (data == null)
      config = new PopUpContent("Are You Sure You Wont To Cancel This Booking", "Yes", "No")
    else
      config = data;
    const modelRef= this.modalService.open(ConfirmationPopupComponent, { centered: true });
    modelRef.componentInstance.config = config
    return modelRef;
  };

  openView2() {
    return this.modalService.open(PayOptionPopUpComponent, { centered:true});
  }

  filterStatus(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.resultsLength = this.data.length

    }
  }
}


