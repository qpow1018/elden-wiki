import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { TDatabase } from "@/lib/supabase/database.types";

let apiClient: SupabaseClient<TDatabase> | undefined;

// 공개 데이터 API 연결. 응답 오류는 각 API 함수에서 처리합니다.
export function getApiClient() {
  if (apiClient) return apiClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(".env.local에 Supabase URL과 publishable key를 설정해주세요.");
  }

  apiClient = createClient<TDatabase>(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return apiClient;
}
