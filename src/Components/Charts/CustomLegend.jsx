export default function CustomLegend({data,colors}){
    return    <div className="flex justify-center gap-6 mt-4">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3  lg:w-4 lg:h-4  rounded-sm"
            style={{ backgroundColor: colors[index] }}
          />
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
}