import { NextRequest, NextResponse } from 'next/server';
import {
  getTokenFromCookie,
} from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get match ID from params
    const { id: matchId } = await params;
    
    if (!matchId) {
      return NextResponse.json({ success: false, error: 'El ID del partido es requerido' }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    const { matchdate, clubId, courtNumber } = body;

    // Only date updates are supported (sole consumer: EditMatchDateModal).
    // Scores are saved live via POST /api/set/create.
    if (!matchdate) {
      return NextResponse.json({ success: false, error: 'El campo matchdate es requerido' }, { status: 400 });
    }

    const dateResponse = await fetch(`${API_URL}/api/matches/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        matchId,
        matchDate: matchdate,
        clubId,
        courtNumber,
      }),
    });

    const dateData = await dateResponse.json();
    if (!dateResponse.ok) {
      return NextResponse.json(
        { success: false, error: dateData.error?.message || dateData.message || 'Error al actualizar fecha' },
        { status: dateResponse.status }
      );
    }
    return NextResponse.json({ success: true, data: dateData.data });
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
