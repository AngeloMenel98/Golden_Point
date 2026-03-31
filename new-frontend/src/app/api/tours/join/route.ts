import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ success: false, error: 'El código es requerido' }, { status: 400 });
    }

    const normalizedCode = code.trim().toUpperCase();
    
    if (normalizedCode.length !== 8) {
      return NextResponse.json({ success: false, error: 'El código debe tener 8 caracteres' }, { status: 400 });
    }

    // Validate alphanumeric (allow lowercase since backend generates with both)
    if (!/^[A-Za-z0-9]+$/.test(normalizedCode)) {
      return NextResponse.json({ success: false, error: 'Código de tour inválido' }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/tour/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code: normalizedCode }),
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
