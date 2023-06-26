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




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<BookingClient>;
  userId: string = "2f4d4152-871c-49c2-9355-0303bec672f6";


  displayedColumns: string[] = ['Date', 'Location', 'Service', 'Amount', 'Status', 'Pay', 'Cancel', 'Details'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private clientBookingService: ClientBookingService,
    private route: Router,
    private paymentService: PaymentService,
    private modalService: NgbModal
  ) { }
  public data!: BookingClient[]




  ngOnInit(): void {
    this.clientBookingService.getAllClientBooking(this.userId).subscribe(data => {
      this.data = data.data
      this.data[0].status = "Pending"
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
          console.log(res2)
        })
      }
    })
  }
  cancel(data: BookingClient) {
    this.openView().closed.subscribe((data: any) => {
      if (data.result) {
        this.paymentService.CancelBooking(data.id).subscribe(data => { console.log(data) })
      }
    })
  }
  refund(data: BookingClient) {
    this.openView2().closed.subscribe(res => {
      if (res.result) {
        this.paymentService.Refund(data.id, res.option).subscribe(data => {
          console.log(data)
        })
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
}


