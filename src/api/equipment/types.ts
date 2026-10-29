import type { TDatabase } from "@/lib/supabase/database.types";

type TEquipmentTables = TDatabase["public"]["Tables"];

export type TReqGetEquipment = {
  signal?: AbortSignal;
};

export type TWeapon = TEquipmentTables["weapon_details"]["Row"] & {
  weapon_skills: Pick<
    TEquipmentTables["weapon_skills"]["Row"],
    "name" | "description" | "fp_cost_text"
  > | null;
  weapon_scalings: TEquipmentTables["weapon_scalings"]["Row"][];
};

export type TEquipment = Pick<
  TEquipmentTables["items"]["Row"],
  "id" | "name" | "type" | "image_url" | "content_code" | "game_description"
> & {
  item_categories: Pick<TEquipmentTables["item_categories"]["Row"], "name"> | null;
  weapon_details: TWeapon | null;
};

export type TResGetEquipment = TEquipment[];
