import SummarySection from "../components/components/account-summary";
import ChampionsTable from "../components/components/champion-table";
import RankCards from "../components/components/rank-card";
import MatchItem from "../components/components/match-history";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-[#4ade80] py-6">
        Loki Fun And You Know It
      </h1>

      {/* Summary Section */}
      <SummarySection />

      {/* Top Champions */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Top Champions</h2>
          <p className="text-sm text-gray-400">Based on XX last games</p>
        </div>
        <ChampionsTable />
      </div>

      {/* Rank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <RankCards
          title="Ranked Flex 5.5 Platinum 1"
          games="472 Games / 1015 LP"
          wins="278W"
          losses="194L"
          winRate="59% WR"
        />
        <RankCards
          title="Ranked Solo Challenger"
          games="472 Games / 1015 LP"
          wins="278W"
          losses="194L"
          winRate="59% WR"
        />
      </div>

      {/* Match History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Match History</h2>
        <div className="space-y-3">
          <MatchItem result="Victory" />
          <MatchItem result="Victory" />
          <MatchItem result="Defeat" />
          <MatchItem result="Defeat" />
          <MatchItem result="Victory" />
        </div>
        <button className="mt-4 text-sm text-gray-400 hover:text-[#4ade80]">
          Show more
        </button>
      </div>
    </div>
  );
}
