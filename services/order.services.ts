import Order from '../model/orders.model';

class OrderServices{
    async createOrder(orderDate:Date,customer:string,status:string,price:number,deliveryDate:Date){
        const order = new Order();
        order.orderDate = orderDate,
        order.customer = customer,
        order.status = status,
        order.price = price,
        order.deliveryDate = deliveryDate
        order.save()
        return order
    };

    async getAllOrders(){
        const orders = await Order.find();
        if(orders) return orders;
        return false;
    }
}

export default new OrderServices;