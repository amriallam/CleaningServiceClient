// import { Component, ViewChild } from '@angular/core';
// import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
// @Component({
//   selector: 'app-payment-paypal',
//   templateUrl: './payment-paypal.component.html',
//   styleUrls: ['./payment-paypal.component.css'],
// })
// export class PaymentPaypalComponent {
//   public payPalConfig?: IPayPalConfig;

//   ngOnInit() {
//     this.initConfig();
//   }
//   private initConfig(): void {
//     this.payPalConfig = {
//       currency: 'EUR',
//       clientId: 'sb',
//       createOrderOnClient: (data) =>
//         <ICreateOrderRequest>{
//           intent: 'CAPTURE',
//           purchase_units: [
//             {
//               amount: {
//                 currency_code: 'EUR',
//                 value: '9.99',
//                 breakdown: {
//                   item_total: {
//                     currency_code: 'EUR',
//                     value: '9.99',
//                   },
//                 },
//               },
//               items: [
//                 {
//                   name: 'Enterprise Subscription',
//                   quantity: '1',
//                   category: 'DIGITAL_GOODS',
//                   unit_amount: {
//                     currency_code: 'EUR',
//                     value: '9.99',
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       advanced: {
//         commit: 'true',
//       },
//       style: {
//         label: 'paypal',
//         layout: 'vertical',
//       },
//       onApprove: (data, actions) => {
//         console.log(
//           'onApprove - transaction was approved, but not authorized',
//           data,
//           actions
//         );
//         actions.order.get().then((details) => {
//           console.log(
//             'onApprove - you can get full order details inside onApprove: ',
//             details
//           );
//         });
//       },
//       onClientAuthorization: (data) => {
//         console.log(
//           'onClientAuthorization - you should probably inform your server about completed transaction at this point',
//           data
//         );
//         // this.showSuccess = true;
//       },
//       onCancel: (data, actions) => {
//         console.log('OnCancel', data, actions);
//       },
//       onError: (err) => {
//         console.log('OnError', err);
//       },
//       onClick: (data, actions) => {
//         console.log('onClick', data, actions);
//       },
//     };
//   }
// }
import { Component, OnInit ,ViewChild ,  ElementRef } from "@angular/core";

import { ICreateOrderRequest } from "ngx-paypal";

// import { ICreateOrderRequest } from "@paypal/checkout-server-sdk";

{}
@Component({
    selector: 'app-payment-paypal',
    templateUrl: './payment-paypal.component.html',
    styleUrls: ['./payment-paypal.component.css'],
  })
export class PaymentPaypalComponent implements OnInit {
  totalPrice  = 100;

  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;

  public payPalConfig: any;
  // public showPaypalButtons: boolean;

  constructor() {}

  ngOnInit() {
    console.log(window.paypal)
    window.paypal.Buttons({
      createOrder: (data : any, actions : any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.totalPrice.toString(),
              },
            },
          ],
        });
      },
      onApprove: async (data : any, actions : any) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onerror: (err : any) => {
        alert('failed ')
        console.log(err);
      }
  }).render(this.paymentRef.nativeElement);
  

  //   // this.payPalConfig = {
  //   //   currency: "EUR",
  //   //   clientId: "AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR",
  //   //   createOrder: data =>
  //   //     <ICreateOrderRequest>{
  //   //       intent: "CAPTURE",
  //   //       purchase_units: [
  //   //         {
  //   //           amount: {
  //   //             currency_code: "EUR",
  //   //             value: "9.99",
  //   //             breakdown: {
  //   //               item_total: {
  //   //                 currency_code: "EUR",
  //   //                 value: "9.99"
  //   //               }
  //   //             }
  //   //           },
  //   //           items: [
  //   //             {
  //   //               name: "Enterprise Subscription",
  //   //               quantity: "1",
  //   //               category: "DIGITAL_GOODS",
  //   //               unit_amount: {
  //   //                 currency_code: "EUR",
  //   //                 value: "9.99"
  //   //               }
  //   //             }
  //   //           ]
  //   //         }
  //   //       ]
  //   //     },
  //   //   advanced: {
  //   //     commit: "true"
  //   //   },
  //   //   style: {
  //   //     label: "paypal",
  //   //     layout: "vertical"
  //   //   },
  //   //   onApprove: (data, actions) => {
  //   //     console.log(
  //   //       "onApprove - transaction was approved, but not authorized",
  //   //       data,
  //   //       actions
  //   //     );
  //   //     actions.order.get().then(details => {
  //   //       console.log(
  //   //         "onApprove - you can get full order details inside onApprove: ",
  //   //         details
  //   //       );
  //   //     });
  //   //   },
  //   //   onClientAuthorization: data => {
  //   //     console.log(
  //   //       "onClientAuthorization - you should probably inform your server about completed transaction at this point",
  //   //       data
  //   //     );
  //   //   },
  //   //   onCancel: (data, actions) => {
  //   //     console.log("OnCancel", data, actions);
  //   //   },
  //   //   onError: err => {
  //   //     console.log("OnError", err);
  //   //   },
  //   //   onClick: (data, actions) => {
  //   //     console.log("onClick", data, actions);
  //   //   }
  //   // };
  // }

  // pay() {
  //   this.showPaypalButtons = true;
  // }

  // back(){
  //   this.showPaypalButtons = false;
  // }
  
  // TOTAL CART ` 
  
  // ngOnInit(): void {
  //   window.paypal.Buttons(
  //     {
       
  //       createOrder: (data: any, actions: any) => {
  //         return actions.order.create({
  //           intent: 'CAPTURE',
  //           payer : { 
  //             name : {
  //               given_name : 'test',
  //               surname : 'test'
  //           },
  //           address:{
  //             address_line_1 : 'test',
  //             address_line_2 : 'test',
  //             admin_area_2 : 'test',
  //             admin_area_1 : 'test',
  //             postal_code : 'test',
  //             country_code : 'test'
  //           },
  //           email_address : '',
  //           phone : {
  //             phone_type : 'MOBILE',
  //             phone_number : {
  //               national_number : 'test'
  //             }
  //           }
  //         },
  //           purchase_units: [
  //             {            
  //               amount: {
  //                 value: this.totalPrice.toString(),
  //                 currency_code: 'USD'
  //               }
  //             }
  //           ]
  //         });
  //       },
  //       onApprove: (data: any, actions: any) => {
  //         return actions.order.capture().then((details: any) => {
  //           console.log(details);
  //           if (details.status === 'COMPLETED') {
  //           alert('Transaction completed by ' + details.payer.name.given_name);
  //           }
  //         });
  //       },
  //       onError: (error: any) => {
  //         console.log(error);
  //       }
  //     }
  //   ).render(this.paymentRef.nativeElement);
  // }

}
}
