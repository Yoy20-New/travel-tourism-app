import { 
  CameraIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  StarIcon,
  MapIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: CameraIcon,
    title: 'Trip Data Capture',
    description: 'Record comprehensive trip information with GPS auto-detection, companions, and travel modes.',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Subscription Packages',
    description: 'Access seasonal travel packages with festival deals, peak-time offers, and off-season discounts.',
  },
  {
    icon: StarIcon,
    title: 'Guide Booking',
    description: 'Connect with rated local guides who provide authentic cultural experiences and hidden insights.',
  },
  {
    icon: MapIcon,
    title: 'Interactive Maps',
    description: 'Discover hidden caves, cultural sites, and secret spots marked by local communities.',
  },
  {
    icon: CalendarDaysIcon,
    title: 'Trip History',
    description: 'Track your travel patterns and revisit memorable moments with detailed trip analytics.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure Data',
    description: 'Your travel data is encrypted and securely stored, supporting scientific research initiatives.',
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Everything You Need for{' '}
            <span className="text-cultural-gradient">Cultural Travel</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From trip tracking to guide booking, our platform provides comprehensive tools 
            for authentic cultural exploration and scientific data collection.
          </p>
        </div>

        <div className="grid-responsive">
          {features.map((feature, index) => (
            <div key={index} className="card group hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-cultural-50 rounded-full">
            <span className="text-sm font-medium text-cultural-800">
              🔬 Supporting NATPAC Research
            </span>
            <span className="text-xs text-cultural-600">
              Your data helps advance transportation science
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
