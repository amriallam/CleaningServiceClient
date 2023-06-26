import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-PayOptionPopUp',
  templateUrl: './PayOptionPopUp.component.html',
  styleUrls: ['./PayOptionPopUp.component.css']
})
export class PayOptionPopUpComponent implements OnInit {

  option:string ="Credit Card";
  constructor(public modalRef: NgbActiveModal
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





