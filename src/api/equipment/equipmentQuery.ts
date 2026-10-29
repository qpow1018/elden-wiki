import { queryOptions } from "@tanstack/react-query";

import { getEquipment } from "@/api/equipment";

export const EQUIPMENT_QUERY_OPTIONS = queryOptions({
  queryKey: ["equipment", "list"],
  queryFn: ({ signal }) => getEquipment({ signal }),
  networkMode: "always",
  // 네트워크 복귀만으로 전체 목록을 다시 불러오지 않습니다.
  refetchOnReconnect: false,
});
