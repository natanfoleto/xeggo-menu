const VITE_DEAUTH_API_URL = import.meta.env.VITE_DEAUTH_API_URL

interface SignInWithGoogleRequest {
  slug: string
}

export async function signInWithGoogle({ slug }: SignInWithGoogleRequest) {
  window.location.href = `${VITE_DEAUTH_API_URL}/auth/google?app=menu&slug=${slug}`
}
