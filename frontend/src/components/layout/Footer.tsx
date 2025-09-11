import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-lg bg-cultural-gradient" />
              <span className="font-display text-xl font-semibold text-white">TravelCulture</span>
            </div>
            <p className="text-sm">
              Discover hidden cultural gems and connect with local guides for authentic travel experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/trips" className="hover:text-white">My Trips</Link></li>
              <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
              <li><Link href="/guides" className="hover:text-white">Find Guides</Link></li>
              <li><Link href="/cultural" className="hover:text-white">Cultural Sites</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} TravelCulture. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-sm">Made with ❤️ for NATPAC scientists</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
