import { Component,OnInit } from '@angular/core';
import { PopUpContent } from '../../Models/PopUpContent';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmationPopup',
  templateUrl: './confirmationPopup.component.html',
  styleUrls: ['./confirmationPopup.component.css']
})


export class ConfirmationPopupComponent implements OnInit {

  config:PopUpContent = new PopUpContent("Are you sure you want to do This action." , "Ok" ,"Cancle")

  constructor(public modalRef: NgbActiveModal
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


