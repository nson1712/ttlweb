import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Region } from "../../lib/types";

export function RegionCard({ region }: { region: Region }) {
  return (
    <div className="relative group overflow-hidden rounded-lg border border-gray-800 transition-all hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20">
      <div className="aspect-video overflow-hidden">
        <Image
          src={region.image}
          alt={region.name}
          width={800}
          height={450}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{region.name}</h3>
        <p className="text-gray-300 line-clamp-2 mb-4">{region.description}</p>
        <Button
          asChild
          variant="outline"
          className="border-amber-400 text-amber-400 hover:bg-amber-400/10"
        >
          <Link href={`/regions/${region.id}`}>Explore Region</Link>
        </Button>
      </div>
    </div>
  );
}
