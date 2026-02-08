'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useCurrencyStore } from '@/store/currencyStore'

// Component to handle Zustand hydration for SSR
function StoreHydration({ children }) {
  const hydrated = useRef(false)

  useEffect(() => {
    if (!hydrated.current) {
      useCurrencyStore.persist.rehydrate()
      hydrated.current = true
    }
  }, [])

  return children
}

// Clear temp reserves on page load (except checkout pages)
// Debounced to avoid redundant fetches on rapid navigation
function TempReserveCleanup({ children }) {
  const pathname = usePathname()
  const { status } = useSession()
  const timerRef = useRef(null)

  useEffect(() => {
    if (status !== 'authenticated') return
    if (pathname.startsWith('/checkout')) return

    // Debounce: only fire after 500ms of no navigation
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      fetch('/api/reserve/clear-temp', { method: 'DELETE' })
    }, 500)

    return () => clearTimeout(timerRef.current)
  }, [pathname, status])

  return children
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <StoreHydration>
        <TempReserveCleanup>
          {children}
        </TempReserveCleanup>
      </StoreHydration>
    </SessionProvider>
  )
}
