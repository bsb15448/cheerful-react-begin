
export interface CustomerData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  code_postal: string;
  pays: string;
}

export interface OrderItem {
  product_id?: number;
  nom_product: string;
  reference: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  discount?: number;
}

export interface DeliveryAddress {
  nom: string;
  prenom: string;
  telephone?: string;
  adresse: string;
  ville: string;
  code_postal: string;
  pays: string;
  instructions?: string;
}

export interface OrderData {
  items: OrderItem[];
  sous_total?: number;
  discount_amount?: number;
  discount_percentage?: number;
  delivery_cost?: number;
  total_order: number;
  status?: string;
  payment_method?: string;
  notes?: string;
  delivery_address?: DeliveryAddress;
}

export interface CompleteOrderRequest {
  customer: CustomerData;
  order: OrderData;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order_id?: number;
  customer_id?: number;
  order_number?: string;
}

export const submitOrder = async (orderData: CompleteOrderRequest): Promise<OrderResponse> => {
  try {
    console.log('Submitting order:', orderData);
    
    const response = await fetch('/api/insert_complete_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Order submission result:', result);
    
    return result;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};
