import { AfterViewInit, Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeElementsOptions, StripePaymentElement } from '@stripe/stripe-js';
import { StripeService } from './stripeDoc';
import { AuthService } from 'src/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'project';
  numberErr = '';
  cardNumber: any = '';
  expiryErr = '';
  cvcErr = '';
  card: StripePaymentElement | undefined = undefined;
  cardType = 'american express';
  cardCom = false;
  stripe: Stripe | null = null;
  element: StripeElements | undefined = undefined;
  paymentElement: StripePaymentElement | null = null;
  constructor(
    private messageService: MessageService,
    // private stripe: StripeDoc
    // private stripeService: StripeService,
    private authService: AuthService
  ) {
    
  }
  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }
  actionFromTable(event: any) {
    console.log('dsafas', event);
  }
  getRandomCardType() {
    const cardTypes = ['american express', 'jcb', 'diners', 'elo', 'unionpay'];
    const randomIndex = Math.floor(Math.random() * cardTypes.length);
    return cardTypes[randomIndex];
  }
  // pay() {
  //   this.card.;
  // }
  async submitCard() {
    if (!this.stripe || !this.element) {
      return;
    }

    const { error } = await this.stripe.confirmPayment({
      elements: this.element,
      confirmParams: {
        return_url: 'http://localhost:4200/payment-success',
        payment_method_data: {
          billing_details: {
            name: 'Jenny Rosen',
            email: 'jenny.rosen@example.com',
          }
        }
      }
    });

    if (error) {
      console.error('Payment failed:', error.message);
    } else {
      console.log('Payment successful');
    }
  }
  async ngOnInit() {
    await this.setupStripe();
    // const elementsOptions: StripeElementsOptions = {
    //   clientSecret: 'pi_3Mu9B3SA2Q0IFXzj127shHFr_secret_J8b8zssdrpgkbE2EC62ivXFI9',
    // };
    // const appearance = {
    // };
     const clientSecret = 'pi_3KPVmkEFzFMWE6uO0k6KOoVE_secret_6hQIy6Xu251MpSx9s64oQG00f';
    this.element = this.stripe?.elements({clientSecret});
    const style = {
      base: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 400,
        // '::placeholder': {
        //   color: '#aab7c4',
        // },
      },
      invalid: {
        color: 'red',
        iconColor: 'red',
      },
    };
  
//     this.card = this.element?.create("payment",
//   //    {
//   //     fields: {
//   //       billingDetails: {
//   //         name: 'never',
//   //         email: 'never',
//   //       }
//   //     }
//   // }
// );
//     this.card?.mount('#card-element');
    
    // this.cardNumber = element?.create('cardNumber', {
    //   style,
    //   placeholder: 'Card Number',
    // });
    // this.cardNumber?.mount('#card-number');
    // this.cardNumber?.on('change', (event: any) => {
    //   if (event.complete) {
    //     // this.numberField = true;
    //     this.numberErr = '';
    //     this.cardCom = event.complete;
    //     this.cardType = event.brand;
    //   } else {
    //     if (event.empty) {
    //       this.numberErr = 'Your card number is incomplete';
    //     }
    //     if (event.error) {
    //       this.numberErr = event.error.message;
    //     }
    //     this.cardType = '';
    //   }
    // });
    // const expiry = element?.create('cardExpiry', {
    //   style,
    //   placeholder: 'Expiry',
    // });
    // expiry?.mount('#card-expiry');
    // expiry?.on('change', (event) => {
    //   if (event.complete) {
    //     this.expiryErr = '';
    //   } else {
    //     if (event.empty) {
    //       this.expiryErr = '';
    //     }
    //     if (event.error) {
    //       this.expiryErr = event.error.message;
    //     }
    //   }
    // })
    // const cvc = element?.create('cardCvc', {
    //   style,
    //   placeholder: 'CVC',
    // });
    // cvc?.mount('#card-cvc');
    // cvc?.on('change', (event) => {
    //   if (event.complete) {
    //     this.cvcErr = '';
    //   } else {
    //     if (event.empty) {
    //       this.cvcErr = '';
    //     }
    //     if (event.error) {
    //       this.cvcErr = event.error.message;
    //     }
    //   }
    // })
    setInterval(() => {
      if (!this.cardCom) {
        this.cardType = this.getRandomCardType();
      }
    }, 3000);
    
    // Pass the appearance object to the Elements instance
    // const elements = stripe.elements({clientSecret, appearance});
    // this.stripeCall.Stripeapi();  
  }
  private async setupStripe() {
    // this.stripe = this.stripeService.getStripe();
    // this.elements = this.stripeService.getElements();
    // if (this.elements) {
    //   this.paymentElement = this.elements.create('payment');
    //   this.paymentElement.mount('#card-element');
    // }
    this.stripe = await loadStripe('pk_test_51KLVQYEFzFMWE6uOQJLCxijeoAJdmZlrRtbgDpc3bCEaQokk9qnihX41DZzsjLUQQ6PQbo4lqCnYPW06hB4eQhnn0044Jc6VrX');
    // this.stripe.Stripeapi().then((res: any) => {
    //   this.stripeEle = res;
    //   console.log('daf', this.stripeEle);
    // })
  }
}
