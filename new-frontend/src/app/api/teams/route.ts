import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

export async function GET(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get tournamentId from search params
    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get('tournamentId');
    
    if (!tournamentId) {
      return NextResponse.json({ success: false, error: 'tournamentId es requerido' }, { status: 400 });
    }

    // Fetch teams by tournamentId from backend
    const response = await fetch(`${API_URL}/api/teams/${tournamentId}`, {
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
      return NextResponse.json({ success: false, error: 'Failed to fetch teams' }, { status: response.status });
    }

    const data = await response.json();
    
    // Backend returns: { success: true, data: { teams: [...] } } or similar
    const teams = data.data?.teams || data.data || [];
    
    return NextResponse.json({ success: true, data: teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { tournamentId, teamName, category, playerIds } = body;

    if (!tournamentId) {
      return NextResponse.json({ success: false, error: 'El ID del torneo es requerido' }, { status: 400 });
    }

    if (!teamName || typeof teamName !== 'string' || teamName.trim() === '') {
      return NextResponse.json({ success: false, error: 'El nombre del equipo es requerido' }, { status: 400 });
    }

    if (!category || typeof category !== 'string') {
      return NextResponse.json({ success: false, error: 'La categoría es requerida' }, { status: 400 });
    }

    if (!playerIds || !Array.isArray(playerIds) || playerIds.length < 2) {
      return NextResponse.json({ success: false, error: 'Selecciona al menos 2 jugadores' }, { status: 400 });
    }

    // Call backend to create team
    const response = await fetch(`${API_URL}/api/team/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        adminUserId: userId,
        tournamentId,
        category: category.trim(),
        usersId: playerIds,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || data.message || 'Error al crear el equipo';
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
