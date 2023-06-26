import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Faq } from 'src/app/core/Models/faq';
import { FaqCategory } from 'src/app/core/Models/faqCategory';
import { FaqService } from 'src/app/core/services/faq.service';

@Component({
  selector: 'app-list-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  skeletonLoading:number=0;
  faqCategories: FaqCategory[] = [];
  @ViewChild("search") search !: ElementRef;
  selectedCategory: FaqCategory = { name: '', faqs: [] };
  searchTerm: string = "";
  constructor(private faqService: FaqService) { }

  ngOnInit(): void {
    this.faqService.getAllFAQ().subscribe(res => {
      if(res.data.length > 0) {
        this.faqCategories = res.data;
        this.skeletonLoading=2
      }
      else
        this.skeletonLoading=1
    });
  }

  selectCategory(category: FaqCategory): void {
    this.selectedCategory = category;
  }
  matchesSearchTerm(faq: Faq): boolean {
    if (!this.searchTerm)
      return true; // If no search term provided, show all resources
    this.searchTerm = this.search.nativeElement.value.toLowerCase();
    const searchParam = faq.question.toLowerCase();
    return searchParam.includes(this.searchTerm); // Check if faq questions/answers includes the search term
  }

  hasMatchingQuestion(category: FaqCategory): boolean {
    if (this.searchTerm === '') {
      return true; // Show the category if search term is empty
    }
    // Check if any question in the category matches the search term
    for (const faq of category.faqs) {
      if (this.matchesSearchTerm(faq)) {
        return true; // Show the category if a matching question is found
      }
    }
    return false; // Hide the category if no matching question is found
  }
}
