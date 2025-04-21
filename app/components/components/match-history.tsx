export default function MatchItem({
  result,
}: {
  result: "Victory" | "Defeat";
}) {
  const borderColor =
    result === "Victory" ? "border-l-[#4ade80]" : "border-l-[#f87171]";
  const textColor = result === "Victory" ? "text-[#4ade80]" : "text-[#f87171]";

  return (
    <div
      className={`bg-[#1e293b] rounded-r-lg border border-[#334155] border-l-4 ${borderColor}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className={`font-semibold ${textColor}`}>{result}</span>
          <span className="text-sm text-gray-400">Normal Draft</span>
          <span className="text-sm text-gray-400">22:30 11.16.2019</span>
        </div>

        <div className="h-px bg-[#334155] my-3"></div>

        <div className="grid grid-cols-5 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Role</p>
            <p>W Jungler</p>
          </div>
          <div>
            <p className="text-gray-400">KDA</p>
            <p>2 / 6 / 3</p>
          </div>
          <div>
            <p className="text-gray-400">KDA Ratio</p>
            <p>23 KDA</p>
          </div>
          <div>
            <p className="text-gray-400">CS</p>
            <p>178/7.21 CS</p>
          </div>
          <div>
            <p className="text-gray-400">Gold</p>
            <p>12 000 Geld</p>
          </div>
        </div>
      </div>
    </div>
  );
}
