import { Key, ReactNode } from "react";

export interface User {
  _id: User | null;
  id: string;
  name: string;
  email: string;
  phone:string;
  idno:string;
  image:String;
  isadmin?:boolean;
}

export interface Event {
  [x: string]: Key | null | undefined;
  title: string;
  description: string;
  location: string;
  date: string;
}
export interface OpportunityType {
  [x: string]: Key | null | undefined;
  title: string;
  description: string;
}

export interface Transactions{
  type:string,
  userId:User,
  amount:number,
  description:string,
  date:string

}



export interface News{
  [x: string]: Key | null | undefined;
  heading: string;
  summary: string;
  content: string;
  date: string;
  image: string;
}

export interface Loan {
  _id: string;
  user: string;
  id: number;
  amount: number;
  status: 'pending' | 'approved' | 'rejected'; 
  userIdno: string;
  date: string;
}

export interface Share {
  _id: string;
  name: string;
  description: string;
  totalQuantity: number;
  currentPrice: number;

}

