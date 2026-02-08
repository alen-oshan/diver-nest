'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCurrencyStore } from '@/store/currencyStore'

// Component to handle Zustand hydration for SSR
function StoreHydration({ children }) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Rehydrate the store on client side
    useCurrencyStore.persist.rehydrate()
    setHydrated(true)
  }, [])

  return children
}

// Clear temp reserves on every page load (except checkout pages where reserves are needed)
function TempReserveCleanup({ children }) {
  const pathname = usePathname()
  const { status } = useSession()

  useEffect(() => {
    if (status !== 'authenticated') return
    if (pathname.startsWith('/checkout')) return
    fetch('/api/reserve/clear-temp', { method: 'DELETE' })
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
