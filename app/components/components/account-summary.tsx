export default function SummaryCard() {
  return (
    <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155]">
      <h2 className="text-xl font-semibold">Your Summary</h2>
      <p className="text-sm text-gray-400 mt-1 mb-4">On average, 14 Jul - 14 June</p>
      <p className="text-lg text-[#4ade80] mb-6">You played like Challenger</p>

      <div className="grid grid-cols-5 gap-4">
        <StatItem label="MATCHES" value="20" badge="+2" />
        <StatItem label="WINS" value="12" badge="+2" />
        <StatItem label="LOSES" value="8" badge="+2" />
        <StatItem label="WINRATE" value="60%" />
        <StatItem label="KDA" value="4.3" badge="+5" />
      </div>
    </div>
  );
}

function StatItem({ label, value, badge }: { label: string; value: string; badge?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      <div className="flex items-center mt-1">
        <span className="text-xl font-bold">{value}</span>
        {badge && (
          <span className="ml-2 bg-[#4ade80]/20 text-[#4ade80] text-xs px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}