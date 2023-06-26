import { Component,OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PopUpContent } from '../../Models/PopUpContent';

@Component({
  selector: 'app-confirmationPopup',
  templateUrl: './confirmationPopup.component.html',
  styleUrls: ['./confirmationPopup.component.css']
})


export class ConfirmationPopupComponent implements OnInit {

  config:PopUpContent = new PopUpContent("Are you sure you want to do This action." , "Ok" ,"Cancle")
  
  constructor(public modalRef: MdbModalRef<ConfirmationPopupComponent>
    ) {}

  ngOnInit() {
  }

  exit(){
    this.modalRef.close({result:false})
  }
  Ok(){
    this.modalRef.close({result:true})
  }
}


