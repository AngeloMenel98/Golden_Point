import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Extract userId from token payload (JWT)
    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id || payload.sub;
    } catch {
      return NextResponse.json({ success: false, error: 'Token inválido' }, { status: 401 });
    }

    // Get match ID from params
    const { id: matchId } = await params;
    
    if (!matchId) {
      return NextResponse.json({ success: false, error: 'El ID del partido es requerido' }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    const { games } = body;

    if (!games) {
      return NextResponse.json({ success: false, error: 'Los resultados (games) son requeridos' }, { status: 400 });
    }

    // Call backend to update match scores
    const response = await fetch(`${API_URL}/api/match/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        userId,
        matchId,
        games,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || data.message || 'Error al actualizar el partido';
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
