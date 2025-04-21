export default function RankCard({
  title,
  games,
  wins,
  losses,
  winRate,
}: {
  title: string;
  games: string;
  wins: string;
  losses: string;
  winRate: string;
}) {
  return (
    <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155]">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 mb-4">{games}</p>
      <div className="flex justify-between text-sm">
        <span>{wins}</span>
        <span>{losses}</span>
        <span>{winRate}</span>
      </div>
    </div>
  );
}