import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

export async function GET(_request: NextRequest) {
  try {
    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/api/users/rankings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, error: 'Failed to fetch global rankings' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Error fetching global rankings:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}