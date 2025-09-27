"use client"

import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40 border-b">
      <div className="container-custom h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-lg bg-cultural-gradient" />
          <span className="font-display text-xl font-semibold">Tourify</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/trips" className="hover:text-primary-600">Trips</Link>
          <Link href="/packages" className="hover:text-primary-600">Packages</Link>
          <Link href="/guides" className="hover:text-primary-600">Guides</Link>
          <Link href="/cultural" className="hover:text-primary-600">Cultural</Link>
          <Link href="/dashboard" className="hover:text-primary-600">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="btn-secondary hidden sm:inline-flex">Log in</Link>
          <Link href="/auth/register" className="btn-primary hidden sm:inline-flex">Sign up</Link>
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Menu">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

