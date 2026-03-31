import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { path } = await params;

    if (!path || path.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Se requiere tourId y userId' },
        { status: 400 }
      );
    }

    const tourId = path[0];
    const userId = path[1];

    const response = await fetch(`${API_URL}/api/users/stats/${tourId}/${userId}`, {
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
      if (response.status === 404) {
        return NextResponse.json({ success: false, error: 'Usuario no encontrado en el torneo' }, { status: 404 });
      }
      return NextResponse.json({ success: false, error: 'Failed to fetch tournament user stats' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Error fetching tournament user stats:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}