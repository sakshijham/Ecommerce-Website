declare module "razorpay" {
    export interface IRazorpayConfig {
      key_id: string;
      key_secret: string;
    }
  
    export interface IRazorpayOrder {
      amount: number; // amount in smallest currency unit (e.g., paise for INR)
      currency: string; // currency code (e.g., "INR")
      receipt?: string; // unique identifier for the order
      payment_capture?: 0 | 1; // 1 for automatic capture, 0 for manual
      notes?: { [key: string]: string }; // optional metadata
    }
  
    export interface IRazorpayOrderResponse {
      id: string; // order ID
      entity: string; // entity type, e.g., "order"
      amount: number; // amount in smallest currency unit
      amount_paid: number; // amount paid
      amount_due: number; // remaining amount
      currency: string; // currency code
      receipt: string; // receipt identifier
      status: string; // order status
      created_at: number; // timestamp
    }
  
    export default class Razorpay {
      constructor(options: IRazorpayConfig);
  
      // Add the 'orders' property here
      orders: {
        create(
          params: IRazorpayOrder
        ): Promise<IRazorpayOrderResponse>;
      };
    }
  }
  