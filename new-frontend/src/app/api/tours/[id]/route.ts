import { NextRequest, NextResponse } from 'next/server';
import {
  getTokenFromCookie,
  getUserIdFromToken,
} from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Token inválido' }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Tour ID is required' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/api/tours/delete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ tourId: id, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403 || data.message?.includes('permission') || data.message?.includes('owner')) {
        return NextResponse.json({ success: false, error: 'No tienes permiso para eliminar este tour' }, { status: 403 });
      }
      const errorMessage = data.error?.message || data.message || 'Error al eliminar el tour';
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Error deleting tour:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
