export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type PatientType = {
  id?: number;
  user_id?: string;
  phone?: string | null;
  gender?: "male" | "female" | null;
  age?: number | null;
};

export type ProfileType = {
  id?: string;
  name?: string;
  email?: string;
  patient?: PatientType;
};

export type MessageType = {
  id: any;
  message: string;
  type: "sent" | "received";
  created_at: string;
};

export type PaginationType = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  has_more_pages: boolean;
  from: number;
  to: number;
};
