import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // Get team ID from params
    const { id: teamId } = await params;
    
    if (!teamId) {
      return NextResponse.json({ success: false, error: 'El ID del equipo es requerido' }, { status: 400 });
    }

    // Call backend to delete team
    const response = await fetch(`${API_URL}/api/team/delete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        userId,
        teamsId: teamId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || data.message || 'Error al eliminar el equipo';
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
