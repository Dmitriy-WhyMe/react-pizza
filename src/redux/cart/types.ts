export type CartItem = { 
    id: string, 
    title: string, 
    price: number, 
    size: number, 
    imageUrl: string, 
    type: string,
    count: number
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItem[]
}