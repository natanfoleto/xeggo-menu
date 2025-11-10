const VITE_PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_API_URL

interface AuthenticateFromGoogleRequest {
  slug?: string | null
}

export async function authenticateFromGoogle({
  slug,
}: AuthenticateFromGoogleRequest) {
  if (slug)
    window.location.href = `${VITE_PUBLIC_API_URL}/auth/google?app=menu&slug=${slug}`
  else window.location.href = `${VITE_PUBLIC_API_URL}/auth/google?app=menu`
}
