import { motion } from "framer-motion";
import { ParentSize } from "@visx/responsive";
import { Ellipsis } from "lucide-react";

export default function HeatMap({ showCells, showAxes }) {
  const data = [
    {
      platform: "TikTok",
      days: [
        { day: "Mon", value: 40 },
        { day: "Tue", value: 70 },
        { day: "Wed", value: 30 },
        { day: "Thu", value: 90 },
        { day: "Fri", value: 50 },
        { day: "Sat", value: 80 },
        { day: "Sun", value: 60 },
      ],
    },
    {
      platform: "Lazada",
      days: [
        { day: "Mon", value: 20 },
        { day: "Tue", value: 60 },
        { day: "Wed", value: 80 },
        { day: "Thu", value: 40 },
        { day: "Fri", value: 70 },
        { day: "Sat", value: 30 },
        { day: "Sun", value: 90 },
      ],
    },
    {
      platform: "Shopee",
      days: [
        { day: "Mon", value: 50 },
        { day: "Tue", value: 40 },
        { day: "Wed", value: 90 },
        { day: "Thu", value: 60 },
        { day: "Fri", value: 30 },
        { day: "Sat", value: 70 },
        { day: "Sun", value: 20 },
      ],
    },
    {
      platform: "Amazon",
      days: [
        { day: "Mon", value: 20 },
        { day: "Tue", value: 60 },
        { day: "Wed", value: 80 },
        { day: "Thu", value: 40 },
        { day: "Fri", value: 70 },
        { day: "Sat", value: 30 },
        { day: "Sun", value: 90 },
      ],
    },
    {
      platform: "Bibli",
      days: [
        { day: "Mon", value: 50 },
        { day: "Tue", value: 40 },
        { day: "Wed", value: 90 },
        { day: "Thu", value: 60 },
        { day: "Fri", value: 30 },
        { day: "Sat", value: 70 },
        { day: "Sun", value: 20 },
      ],
    },
  ];
  const margin = {
    top: 10,
    right: 20,
    bottom: 40,
    left: 70,
  }; //space arround charts
  const days = data[0].days.map((d) => d.day); //we extracted days name from data
  const platforms = data.map((d) => d.platform); //we extracted platforms from data [tiktok , lazada , ...]
  const cellSize = 40; //cell width is 40px and cell hieght is 40px
  const gap = 6; //distance between cells
  const getColor = (value) => {
    if (value < 20) return "#e5e7eb";
    if (value < 40) return "#bfdbfe";
    if (value < 60) return "#60a5fa";
    if (value < 80) return "#2563eb";
    return "#1e3a8a";
  };
  return (
    <div className="bg-white rounded-lg  pl-2 pt-2 w-full h-full ">
      {showAxes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ paddingRight: margin.right }}
          className="flex justify-between"
        >
          <h2 className="font-medium">Product Reach</h2>
          <Ellipsis className="opacity-60 hover:opacity-100 transition" />
        </motion.div>
      )}
      {showCells && (
        <ParentSize>
          {({ width, height }) => {
            const columnsCount = days.length;
            const rowsCount = platforms.length;
            const availableWidth = width - margin.left - margin.right;
            const totalGapsWidth = (columnsCount - 1) * gap;

            const dynamicCellSize = Math.max(
              10,
              (availableWidth - totalGapsWidth) / columnsCount,
            );

            const totalContentHeight =
              rowsCount * dynamicCellSize + (rowsCount - 1) * gap;

            const isMobile = width < 768;
            const finalSvgHeight = isMobile
              ? totalContentHeight + margin.top + margin.bottom
              : height;
            const verticalOffset = isMobile
              ? margin.top
              : (height - totalContentHeight) / 2;

            return (
              <svg
                width={width}
                height={finalSvgHeight}
                viewBox={`0 0 ${width} ${finalSvgHeight}`}
              >
                {/* نصوص المنصات - أضفنا verticalOffset لقيمة y */}
                {platforms.map(
                  (platform, i) =>
                    showAxes && (
                      <motion.text
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        key={platform}
                        x={0}
                        y={
                          verticalOffset +
                          i * (dynamicCellSize + gap) +
                          dynamicCellSize / 2
                        }
                        dominantBaseline="middle"
                        textAnchor="start"
                        fontSize={12}
                      >
                        {platform}
                      </motion.text>
                    ),
                )}

                {/* نصوص الأيام - نضعها تحت المربعات مباشرة بمسافة ثابتة */}
                {days.map((day, i) => {
                  const x = i * (dynamicCellSize + gap) + dynamicCellSize / 2;
                  return (
                    showAxes && (
                      <motion.text
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        key={day}
                        x={x + margin.left}
                        y={verticalOffset + totalContentHeight + 20} // تتبع نهاية المربعات
                        textAnchor="middle"
                        fontSize={12}
                        fill="#6b7280"
                      >
                        {day}
                      </motion.text>
                    )
                  );
                })}

                {/* المربعات - نستخدم verticalOffset في الـ transform */}
                <g transform={`translate(${margin.left}, ${verticalOffset})`}>
                  {data.map((row, rowIndex) =>
                    row.days.map((cell, colIndex) => {
                      const x = colIndex * (dynamicCellSize + gap);
                      const y = rowIndex * (dynamicCellSize + gap);
                      return (
                        <motion.rect
                          key={`${rowIndex}-${colIndex}`}
                          x={x}
                          y={y}
                          width={dynamicCellSize}
                          height={dynamicCellSize}
                          rx={6}
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: colIndex * 0.12 }}
                          fill={getColor(cell.value)}
                        />
                      );
                    }),
                  )}
                </g>
              </svg>
            );
          }}
        </ParentSize>
      )}
    </div>
  );
}
