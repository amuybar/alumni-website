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