import { Key } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone:string;
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
  amount:number,
    date:string,
    type:string,
    user:string

}

export interface Board{
  name:string;
  position:string;
  picture:string;
  id:string;
}

export interface News{
  id: number;
  heading: string;
  summary: string;
  content: string;
  date: string;
  image: string;
}