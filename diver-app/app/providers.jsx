'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
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

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <StoreHydration>
        {children}
      </StoreHydration>
    </SessionProvider>
  )
}
