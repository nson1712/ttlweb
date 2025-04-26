import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../../components/ui/badge'
import { Champion } from '../../lib/types'

export function ChampionCard({ champion }: { champion: Champion }) {
  return (
    <Link
      href={`/champions/${champion.id}`}
      className="group relative overflow-hidden rounded-lg border border-gray-800 transition-all hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20"
    >
      <div className="aspect-square overflow-hidden">
        <Image
          src={champion.image}
          alt={champion.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">{champion.name}</h3>
          <Badge variant="secondary">{champion.region}</Badge>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">
          {champion.description}
        </p>
      </div>
    </Link>
  )
}