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

    // Call backend /api/me endpoint to validate token and get user data
    const response = await fetch(`${API_URL}/api/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // Token is invalid or expired - clear cookie on client side
      if (response.status === 401) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, error: 'Failed to fetch user data' }, { status: response.status });
    }

    const data = await response.json();
    
    // Backend returns user data - normalize to expected format
    // Backend may return: { success: true, data: { user: {...} } } or similar
    const user = data.user || data.data?.user || data.data || data;
    
    // Clear sensitive fields that shouldn't be exposed
    const { password, token: _, ...safeUser } = user;
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        user: {
          id: safeUser.id,
          username: safeUser.username || safeUser.name,
          email: safeUser.email,
          role: safeUser.role,
          firstName: safeUser.firstName,
          lastName: safeUser.lastName,
        }
      }
    });
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión. Intenta de nuevo.' }, { status: 500 });
  }
}
