import { Component, OnInit } from '@angular/core';
import { Faq } from 'src/app/core/Models/faq';
import { FaqService } from 'src/app/core/services/faq.service';

@Component({
  selector: 'app-list-faq',
  templateUrl: './faq.component.html',
})
export class FaqComponent implements OnInit {
  faqs:Faq[]=[];
  constructor(private faqService:FaqService){}
  ngOnInit(): void {
    this.faqService.getAllFAQ().subscribe(res =>this.faqs = res.data);
  }
}
