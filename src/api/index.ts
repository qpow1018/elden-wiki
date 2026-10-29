import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { TDatabase } from '@/lib/supabase/database.types';

let apiClient: SupabaseClient<TDatabase> | undefined;

// 공개 데이터 API 연결. 요청 실패는 공통 fetch에서 기록합니다.
export function getApiClient() {
  if (apiClient) return apiClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error('.env.local에 Supabase URL과 publishable key를 설정해주세요.');
  }

  apiClient = createClient<TDatabase>(url, publishableKey, {
    global: { fetch: fetchWithErrorLogging },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return apiClient;
}

async function fetchWithErrorLogging(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  let response: Response;

  try {
    response = await fetch(input, init);
  } catch (error) {
    const isAborted =
      init?.signal?.aborted || (error instanceof Error && error.name === 'AbortError');
    if (!isAborted) console.error('API 네트워크 요청 실패', error);
    throw error;
  }

  if (!response.ok) {
    // 원본 응답 본문은 SDK가 읽을 수 있도록 복제본만 사용합니다.
    const body = await response
      .clone()
      .text()
      .catch(() => '응답 본문을 읽지 못했습니다.');
    console.error('API 응답 실패', {
      status: response.status,
      statusText: response.statusText,
      body,
    });
  }

  return response;
}
