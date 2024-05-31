import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51JtRmYSA2Q0IFXzjnKQ1tADbBN15JQPRIuclj3yGqFJXpycEcSP2OU8qbQxjMNOF6Ivq5yRc6ShPQF4uLck8pU4l004iNyKgH0');
    if (this.stripe) {
      this.elements = this.stripe.elements();
    }
  }

  getStripe() {
    return this.stripe;
  }

  getElements() {
    return this.elements;
  }
}
