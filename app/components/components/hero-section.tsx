import { Button } from '../../components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="League of Legends Universe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-amber-400">
          LEAGUE OF LEGENDS UNIVERSE
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
          Explore the lore, champions, and regions of Runeterra
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
            <Link href="/champions">Explore Champions</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/regions">Discover Regions</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}