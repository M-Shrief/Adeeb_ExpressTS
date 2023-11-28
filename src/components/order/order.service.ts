// Redis
import redisClient from '../../redis';
// Models
import { Order } from './order.model';
// Types
import { OrderType } from '../../interfaces/order.interface';
// Schema
import { createSchema, updateSchema } from './order.schema';

export const OrderService = {
  async getGuestOrders(
    name: string,
    phone: string,
  ): Promise<OrderType[] | false> {
    let orders: OrderType[];

    orders = await Order.find(
      { name, phone },
      {
        name: 1,
        phone: 1,
        address: 1,
        reviewed: 1,
        completed: 1,
        products: 1,
        createdAt: 1,
      },
      {
        sort: {
          createdAt: -1,
        },
      },
    );

    if (orders.length === 0) return false;
    return orders;
  },

  async getPartnerOrders(partner: string): Promise<OrderType[] | false> {
    let orders: OrderType[];

    orders = await Order.find(
      { partner },
      {
        partner: 1,
        name: 1,
        phone: 1,
        address: 1,
        reviewed: 1,
        completed: 1,
        products: 1,
        createdAt: 1,
      },
      {
        sort: {
          createdAt: -1,
        },
      },
    );

    if (orders.length === 0) return false;
    return orders;
  },

  async post(orderData: OrderType): Promise<OrderType | false> {
    const isValid = await createSchema.isValid(orderData);
    if (!isValid) return false;
    const order = new Order();
    if (orderData.partner) order.partner = orderData.partner;

    order.name = orderData.name;
    order.phone = orderData.phone;
    order.address = orderData.address;
    order.reviewed = orderData.reviewed;
    order.completed = orderData.completed;
    order.products = orderData.products;

    const newOrder = await order.save();
    if (!newOrder) return false;
    return newOrder;
  },

  async update(id: string, orderData: OrderType): Promise<OrderType | false> {
    const isValid = await updateSchema.isValid(orderData);
    if (!isValid) return false;
    const order = await Order.findById(id);
    if (!order) return false;
    const newOrder = await order.updateOne({ $set: orderData });
    if (!newOrder) return false;
    return newOrder;
  },

  async remove(id: string): Promise<OrderType | false> {
    const order = await Order.findByIdAndRemove(id);
    if (!order) return false;
    return order;
  },
};
