export interface Order {
  orderStatus: string,
  paymentStatus: string,
  shippingAddress: string,
  products: OrderProduct[]
}

export interface OrderProduct {
color: string,
image: string,
name: string,
quantity: number
_id: string
product: string
}