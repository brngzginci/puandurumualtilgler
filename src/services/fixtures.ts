import type { FixturesApiResponse } from '../types/fixture';

export interface FetchFixturesParams {
  season?: string;
  league?: string;
  group?: string;
  week: number;
}

export async function fetchFixtures(params: FetchFixturesParams): Promise<FixturesApiResponse> {
  try {
    const season = params.season || '2026-2027';
    const league = params.league || 'trendyol-1-lig';
    let url = `/api/fixtures?season=${encodeURIComponent(season)}&week=${encodeURIComponent(params.week)}&league=${encodeURIComponent(league)}`;
    if (params.group) {
      url += `&group=${encodeURIComponent(params.group)}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data: any = await response.json().catch(() => ({
      success: false,
      error: `Sunucu yanıtı okunamadı (HTTP Status ${response.status})`,
    }));

    if (data && data.error && typeof data.error === 'object') {
      const errObj = data.error as any;
      data.error = errObj.message || errObj.code || JSON.stringify(errObj);
    }

    return data as FixturesApiResponse;
  } catch (error: any) {
    console.error('[FixturesService] Network or unexpected error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected client network error occurred.',
    };
  }
}
