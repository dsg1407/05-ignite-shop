import Stripe from "stripe";

const API_KEY = process.env.STRIPE_SECRET_KEY as string

export const stripe = new Stripe(API_KEY ,{
  apiVersion: '2025-01-27.acacia',
  appInfo: {
    name:"Ignite Shop"
  }
})