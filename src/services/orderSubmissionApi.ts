interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  zip_code: string;
}

interface OrderItem {
  item_id: string;
  quantity: number;
  price: number;
  total_price: number;
  name: string;
  size: string;
  color: string;
  personalization: string;
  pack: string;
  box: string;
  image: string;
}

interface PriceDetails {
  subtotal: number;
  shipping_cost: number;
  has_newsletter_discount: boolean;
  newsletter_discount_amount: number;
  final_total: number;
  box_total?: number;
}

interface PaymentDetails {
  method: 'card' | 'cash';
  status: string;
  konnect_payment_url: string;
  completed_at: string;
}

interface OrderStatus {
  status: string;
  shipped_at: string | null;
  delivered_at: string | null;
}

interface OrderSubmission {
  order_id: string;
  user_details: UserDetails;
  items: OrderItem[];
  price_details: PriceDetails;
  payment: PaymentDetails;
  order_status: OrderStatus;
}

const sendOrderConfirmationEmail = async (orderData: OrderSubmission): Promise<void> => {
  console.log('Starting email confirmation process...');
  
  try {
    // Format the data for the email endpoint
    const emailData = {
      order_id: orderData.order_id,
      customer_email: orderData.user_details.email,
      customer_name: `${orderData.user_details.first_name} ${orderData.user_details.last_name}`,
      order_details: {
        items: orderData.items,
        total: orderData.price_details.final_total,
        shipping: orderData.price_details.shipping_cost,
        address: orderData.user_details.address,
        payment_method: orderData.payment.method
      }
    };

    console.log('Sending email with data:', JSON.stringify(emailData, null, 2));

    const response = await fetch('https://fioriforyou.com/send_order_email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(emailData),
    });

    const responseText = await response.text();
    console.log('Raw email API response:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse email API response:', e);
      throw new Error(`Invalid email API response: ${responseText}`);
    }

    console.log('Parsed email confirmation response:', result);

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status} - ${JSON.stringify(result)}`);
    }

    if (result.error) {
      throw new Error(`Email service error: ${result.error}`);
    }

  } catch (error) {
    console.error('Detailed error sending confirmation email:', error);
    throw new Error(`Failed to send confirmation email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const submitOrder = async (orderData: OrderSubmission): Promise<any> => {
  console.log('Starting order submission process...');

  try {
    // Format items to ensure personalization is properly handled
    const formattedItems = orderData.items.map(item => ({
      ...item,
      pack: item.pack || 'aucun',
      size: item.size || '-',
      personalization: item.personalization && item.personalization !== '' ? item.personalization : '-',
      box: item.box || 'Sans box'
    }));

    const formattedOrderData = {
      ...orderData,
      items: formattedItems
    };

    console.log('Submitting order with formatted data:', JSON.stringify(formattedOrderData, null, 2));

    // Submit the order
    const orderResponse = await fetch('https://respizenmedical.com/fiori/submit_all_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(formattedOrderData),
    });

    const orderResponseText = await orderResponse.text();
    console.log('Raw order submission response:', orderResponseText);

    if (!orderResponse.ok) {
      throw new Error(`Order submission failed: ${orderResponse.status} - ${orderResponseText}`);
    }

    let orderResult;
    try {
      orderResult = JSON.parse(orderResponseText);
    } catch (e) {
      console.error('Failed to parse order submission response:', e);
      throw new Error(`Invalid order submission response: ${orderResponseText}`);
    }

    console.log('Order submission successful:', orderResult);

    // If order submission is successful, send confirmation email
    try {
      console.log('Attempting to send confirmation email...');
      await sendOrderConfirmationEmail(orderData);
      console.log('Email confirmation sent successfully');
    } catch (emailError) {
      console.error('Email confirmation failed but order was submitted:', emailError);
      // Don't throw here - we want to return success even if email fails
    }

    return orderResult;
  } catch (error) {
    console.error('Error in order submission process:', error);
    throw error;
  }
};