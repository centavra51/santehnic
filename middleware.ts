import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    let response = handleI18nRouting(request);

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAdminRoute = request.nextUrl.pathname.match(/^\/(ru|ro)\/admin/);
    const isLoginRoute = request.nextUrl.pathname.match(/^\/(ru|ro)\/admin\/login/);

    if (isAdminRoute && !isLoginRoute && !user) {
        const url = request.nextUrl.clone();
        const locale = request.nextUrl.pathname.split('/')[1] || 'ru';
        url.pathname = `/${locale}/admin/login`;
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    // Match only internationalized pathnames, skipping Next.js internals and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
