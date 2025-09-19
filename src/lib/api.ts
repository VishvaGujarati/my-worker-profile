import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  name_en: z.string().nullable().optional(),
  name_in: z.string().nullable().optional(),
  name_zh_HK: z.string().nullable().optional(),
});

export const LocationSchema = z.object({
  id: z.number(),
  name_en: z.string().nullable().optional(),
  name_in: z.string().nullable().optional(),
  name_zh_HK: z.string().nullable().optional(),
  name_zh_CN: z.string().nullable().optional(),
});

export const NationalitySchema = z.object({
  id: z.number(),
  name_en: z.string().nullable().optional(),
  name_in: z.string().nullable().optional(),
  name_zh_HK: z.string().nullable().optional(),
  name_zh_CN: z.string().nullable().optional(),
});

export const WorkerOverseasDetailSchema = z.object({
  worker_id: z.number(),
  eregistration_status: z.string().nullable().optional(),
  eregistration_file: z.string().url().nullable().optional(),
  eregistration_file_uploaded_at: z.string().nullable().optional(),
  passport_number_in_eregistration: z.string().nullable().optional(),
});

export const WorkerSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  reference_id: z.string().nullable().optional(),
  fullname: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  email_verified: z.number().nullable().optional(),
  image: z.string().nullable().optional(),
  about: z.string().nullable().optional(),
  mobile_number: z.string().nullable().optional(),
  mobile_verified: z.number().nullable().optional(),
  country_code: z.string().nullable().optional(),
  country_code_name: z.string().nullable().optional(),
  whatsapp_country_code: z.string().nullable().optional(),
  whatsapp_number: z.string().nullable().optional(),
  whatsapp_verified: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  status: z.number().nullable().optional(),
  registration_type: z.string().nullable().optional(),
  type: z.number().nullable().optional(),

  // nested objects
  role: RoleSchema.nullable().optional(),
  nationality: NationalitySchema.nullable().optional(),
  nationality_info: NationalitySchema.nullable().optional(),
  current_location: LocationSchema.nullable().optional(),
  contract_category_info: z.any().nullable().optional(),

  // worker overseas detail
  worker_overseas_detail_info: WorkerOverseasDetailSchema.nullable().optional(),
});

export type Worker = z.infer<typeof WorkerSchema>;

if (!process.env.API_URL) {
  throw new Error("WORKER_API_URL is not defined in environment");
}

export async function fetchWorker(id: string): Promise<Worker> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("API base URL not defined in environment");

  const res = await fetch(`${baseUrl}/${id}?type=document`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch worker: ${res.status}`);
  }

  const json = await res.json();
  const worker = WorkerSchema.parse(json.data);
  return worker;
}
