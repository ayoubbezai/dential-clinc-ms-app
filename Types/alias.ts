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
