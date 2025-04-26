export default function ChampionsTable() {
  const champions = [
    { hero: "Talon", games: 2456, wr: "52%", kda: 3.89, role: "Jungler" },
    { hero: "Tryndamer", games: 2456, wr: "52%", kda: 3.89, role: "Support" },
    { hero: "Alamiya", games: 2456, wr: "52%", kda: 3.89, role: "ADC" },
  ];

  return (
    <div className="bg-[#1e293b] rounded-lg border border-[#334155] overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-[#334155]">
          <tr>
            <th className="text-left p-4 text-gray-300 font-semibold">Hero</th>
            <th className="text-left p-4 text-gray-300 font-semibold">Games</th>
            <th className="text-left p-4 text-gray-300 font-semibold">WR</th>
            <th className="text-left p-4 text-gray-300 font-semibold">KDA</th>
            <th className="text-left p-4 text-gray-300 font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champ) => (
            <tr key={champ.hero} className="border-b border-[#334155] last:border-0">
              <td className="p-4 font-medium">{champ.hero}</td>
              <td className="p-4">{champ.games}</td>
              <td className="p-4">{champ.wr}</td>
              <td className="p-4">{champ.kda}</td>
              <td className="p-4">{champ.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}