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

    // Get tourId from search params
    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get('tourId');
    
    if (!tourId) {
      return NextResponse.json({ success: false, error: 'tourId es requerido' }, { status: 400 });
    }

    // Fetch tournaments by tourId
    const response = await fetch(`${API_URL}/api/tournament/tourns/${tourId}`, {
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
      return NextResponse.json({ success: false, error: 'Failed to fetch tournaments' }, { status: response.status });
    }

    const data = await response.json();
    console.log('Backend response:', data);
    
    // Backend returns: { success: true, data: { "tournamentId": { tournamentName, teamsCount, master, status, categories }, ... } }
    // The data.data is an OBJECT with tournament IDs as keys, NOT an array
    
    const tournaments: Array<{
      id: string;
      tourId: string;
      name: string;
      masterScore: number;
      status: string;
      teamsCount: number;
      categories: Array<{ category: string; gender: string }>;
    }> = [];
    
    // Extract the tournaments object (it's in data.data or directly in data)
    const tournamentsObj = data.data || data;
    
    if (tournamentsObj && typeof tournamentsObj === 'object' && !Array.isArray(tournamentsObj)) {
      Object.entries(tournamentsObj).forEach(([id, t]) => {
        const tournament = t as Record<string, unknown>;
        tournaments.push({
          id: id,
          tourId: tourId,
          name: String(tournament.tournamentName || tournament.name || 'Unnamed'),
          masterScore: parseInt(String(tournament.master || tournament.masterScore || 0), 10),
          status: String(tournament.status || 'pending'),
          teamsCount: parseInt(String(tournament.teamsCount || 0), 10),
          // Categories come as [{ category, gender }] objects
          categories: Array.isArray(tournament.categories) 
            ? (tournament.categories as Array<{ category: string; gender: string }>)
            : [],
        });
      });
    }
    
    return NextResponse.json({ success: true, data: tournaments });
  } catch (error) {
    console.error('Error fetching tournaments:', error);
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
    const { name, tourId, masterScore, categories } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ success: false, error: 'El nombre del torneo es requerido' }, { status: 400 });
    }

    if (!tourId) {
      return NextResponse.json({ success: false, error: 'El tour es requerido' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/api/tournament/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        title: name.trim(), 
        tourId,
        userId,
        master: masterScore || 0,
        categories: categories || []
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || data.message || 'Error al crear el torneo';
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
