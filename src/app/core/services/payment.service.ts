import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private stripePromise: Promise<any>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51MYW00L4FZm4LCWY9I7ZGZWKErGc3sh3NNOxNxPb69FQ1VtPfCKgRBB7LgVbzLE8jKPAqcUxeVbCEL9FwW14VppJ002IEnoyms');
  }

  getStripe(): Promise<any> {
    return this.stripePromise;
  }

}
