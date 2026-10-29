import { getApiClient } from "@/api";
import type { TReqGetEquipment, TResGetEquipment } from "./types";

const PAGE_SIZE = 500;
const EQUIPMENT_SELECT =
  "id,name,type,image_url,content_code,game_description,item_categories(name),weapon_details(*,weapon_skills(name,description,fp_cost_text),weapon_scalings(*))";

export async function getEquipment({ signal }: TReqGetEquipment = {}): Promise<TResGetEquipment> {
  const client = getApiClient();
  const equipment: TResGetEquipment = [];

  // Data API의 기본 응답 한도를 넘는 목록도 빠짐없이 조회합니다.
  for (let start = 0; ; start += PAGE_SIZE) {
    const request = client
      .from("items")
      .select(EQUIPMENT_SELECT)
      .order("id")
      .range(start, start + PAGE_SIZE - 1);

    if (signal) request.abortSignal(signal);

    const { data, error } = await request;
    if (error) throw error;

    equipment.push(
      ...data.map((row) => ({
        ...row,
        // 복합 외래키 관계는 배열로 응답하지만 item_id PK가 최대 한 행을 보장합니다.
        weapon_details: row.weapon_details[0] ?? null,
      })),
    );

    if (data.length < PAGE_SIZE) return equipment;
  }
}
