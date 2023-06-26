import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PopUpContent } from '../../Models/PopUpContent';
@Component({
  selector: 'app-PayOptionPopUp',
  templateUrl: './PayOptionPopUp.component.html',
  styleUrls: ['./PayOptionPopUp.component.css']
})
export class PayOptionPopUpComponent implements OnInit {

  option:string ="Credit Card";
  constructor(public modalRef: MdbModalRef<PayOptionPopUpComponent>
    ) {}

  ngOnInit() {
  }

  exit(){
    this.modalRef.close({result:false})
  }
  Ok(){

    this.modalRef.close({result:true , option:this.option})
  }

}





