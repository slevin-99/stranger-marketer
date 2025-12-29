import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to true to enable maintenance mode
const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
    // If maintenance mode is disabled, allow all requests
    if (!MAINTENANCE_MODE) {
        return NextResponse.next();
    }

    const { pathname } = request.nextUrl;

    // Allow access to these paths even in maintenance mode
    const allowedPaths = [
        '/maintenance',      // The maintenance page itself
        '/_next',            // Next.js static assets
        '/favicon.ico',      // Favicon
        '/og-images',        // OG images for social previews
        '/characters',       // Character images (if needed for OG)
    ];

    // Check if the current path starts with any allowed path
    const isAllowed = allowedPaths.some(path => pathname.startsWith(path));

    if (isAllowed) {
        return NextResponse.next();
    }

    // Redirect all other requests to maintenance page
    const maintenanceUrl = new URL('/maintenance', request.url);
    return NextResponse.redirect(maintenanceUrl);
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
