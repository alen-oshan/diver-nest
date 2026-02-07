'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect, useState, useRef } from 'react'
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

// Component to handle checkout reservation cleanup on navigation
function CheckoutCleanup({ children }) {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // If navigating away from checkout page, clear temp reserves
    if (prevPathname.current === '/checkout' && pathname !== '/checkout') {
      fetch('/api/reserve/clear-temp', { method: 'DELETE' })
    }
    prevPathname.current = pathname
  }, [pathname])

  return children
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <StoreHydration>
        <CheckoutCleanup>
          {children}
        </CheckoutCleanup>
      </StoreHydration>
    </SessionProvider>
  )
}
