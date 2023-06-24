import {AfterViewInit,Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BookingClient } from 'src/app/core/Models/BookingClient';
import { BookingStaus } from "src/app/core/Models/BookingStaus";
import { ClientBookingService } from 'src/app/core/services/ClientBooking.service';
import {  Router } from '@angular/router';




@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit , AfterViewInit {

  
  public dataSource!:MatTableDataSource<BookingClient>;

   displayedColumns : string[] = ['Date','Location','Service','Amount','Status','Action'];
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private clientBookingService : ClientBookingService,
    private route:Router
    ){}
  public data!:BookingClient[]


 

  ngOnInit(): void {
    this.clientBookingService.getAllClientBooking('41d1d38c-9fc3-451f-a33c-3e83663c368a').subscribe(data=>{
      this.data=data.data
      this.dataSource = new MatTableDataSource(this.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     })
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBookingStatusName(value : number): string {
    return BookingStaus[value]
  }

  bookingDetail(id:number){
    this.route.navigate(['profile','booking-details',id])
  }

}
