import express from 'express';
import orderServices from '../services/order.services';

class OrderController{
    async createOrderController(req:express.Request,res:express.Response){
        const order = await orderServices.createOrder(req.body.orderDate,req.body.customer,req.body.status,req.body.price,req.body.deliveryDate);
        if(order) return res.status(201).send(order)
        return res.status(400).send({message:"Failed to create new order"}); 
    }
    async getAllOrdersController(_:express.Request,res:express.Response){
        const orders = await orderServices.getAllOrders();
        if(orders) return res.status(200).send(orders);
        return res.status(404).send({message:"Not Found"});
    }    
}


export default new OrderController;