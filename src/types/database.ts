import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Collateral {
  collateral_id: Generated<number>;
  url: string;
  summary: string;
}

export interface Company {
  id: Generated<number>;
  company_name: string;
  user_id: string;
}

export interface Customer {
  customer_id: Generated<number>;
  user_id: string;
  company_id: number;
  biodata: string;
  title: string;
}

export interface Deal {
  deal_id: Generated<number>;
  deal_size: number;
  deal_description: string;
  customer_id: number;
}

export interface Email {
  email_id: Generated<number>;
  email_content: string;
  prospects_involved: string;
}

export interface Meeting {
  meeting_id: Generated<number>;
  user_id: string;
  summary: string;
  meeting_date: Date;
  meeting_notes: string;
}

export interface Note {
  note_id: Generated<number>;
  note_text: string;
}

export interface User {
  user_id: string;
  user_name: string;
  credits: Generated<number>;
}

export interface DB {
  collateral: Collateral;
  Company: Company;
  Customer: Customer;
  Deal: Deal;
  Email: Email;
  Meeting: Meeting;
  Note: Note;
  User: User;
}
