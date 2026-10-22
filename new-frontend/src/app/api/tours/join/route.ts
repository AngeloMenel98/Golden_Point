import { NextRequest, NextResponse } from 'next/server';
import {
  getTokenFromCookie,
  getUserIdFromToken,
} from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Token inválido' }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ success: false, error: 'El código es requerido' }, { status: 400 });
    }

    // Backend tourCode is case-sensitive and generated with mixed case — do NOT uppercase.
    const normalizedCode = code.trim();
    
    if (normalizedCode.length !== 8) {
      return NextResponse.json({ success: false, error: 'El código debe tener 8 caracteres' }, { status: 400 });
    }

    // Validate alphanumeric (allow lowercase since backend generates with both)
    if (!/^[A-Za-z0-9]+$/.test(normalizedCode)) {
      return NextResponse.json({ success: false, error: 'Código de tour inválido' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/api/tours/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ tourCode: normalizedCode, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404 || data.message?.includes('inválid') || data.message?.includes('not found')) {
        return NextResponse.json({ success: false, error: 'Código de tour inválido' }, { status: 400 });
      }
      if (response.status === 409 || data.message?.includes('already') || data.message?.includes('miembro')) {
        return NextResponse.json({ success: false, error: 'Ya eres parte de este tour' }, { status: 409 });
      }
      const errorMessage = data.error?.message || data.message || 'Error al unirse al tour';
      return NextResponse.json({ success: false, error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error('Error joining tour:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
