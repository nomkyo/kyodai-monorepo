import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Request, Response } from 'express';

export function getSupabaseClient(req: Request, res: Response): SupabaseClient {
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.cookie ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.appendHeader(
              'Set-Cookie',
              serializeCookieHeader(name, value, {
                ...options,
                domain: process.env.DOMAIN,
                httpOnly: true,
              }),
            ),
          );
        },
      },
    },
  );
}
