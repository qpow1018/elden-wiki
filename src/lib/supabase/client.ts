import { createClient } from "@supabase/supabase-js";

// 공개 데이터 조회용 클라이언트. 사용자 인증은 로그인 설계 시 별도로 구성합니다.
export const createSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(".env.local에 Supabase URL과 publishable key를 설정해주세요.");
  }

  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
};
