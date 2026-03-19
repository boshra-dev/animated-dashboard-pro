import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { motion } from "framer-motion";
import React, { useId, useMemo, useState } from "react";
import { GridRows } from "@visx/grid";
import { ParentSize } from "@visx/responsive";
import { Ellipsis } from "lucide-react";
export default function BarChartComponent({ showAxes }) {
  const data = [
    { name: "Mon", value: 25000 },
    { name: "Tue", value: 22000 },
    { name: "Wed", value: 13000 },
    { name: "Thu", value: 18000 },
    { name: "Fri", value: 12000 },
    { name: "Sat", value: 21000 },
    { name: "Sun", value: 24000 },
  ];
  const margin = { top: 20, right: 5, bottom: 25, left: 44 };
  const patternId = useId();
  console.log(patternId);
  const [activeBar, setActiveBar] = useState(null);
  const [showBars, setShowBars] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow pl-2 pt-2 ">
      {showAxes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ paddingRight: margin.right }}
          className="flex justify-between"
        >
          <h2 className="font-medium">Total Sales</h2>
          <Ellipsis className="opacity-60 hover:opacity-100 transition" />
        </motion.div>
      )}
      <ParentSize debounceTime={150}>
        {({ width: parentWidth, height: parentHeight }) => {
          console.log(parentWidth);
          // parentWidth و parentHeight بيجوا تلقائيًا من حجم الـ div الأب
          const safeWidth = Math.max(parentWidth || 320, 320); // min width عشان ما يصير صغير جدًا
          const safeHeight = Math.max(parentHeight || 240, 240);

          //scale is func tranform data value to position on screen
          const xScale = useMemo(() => {
            return scaleBand({
              domain: data.map((d) => d.name), //days name
              range: [margin.left, safeWidth - margin.right], //first bar start on margin.left and final bar finish at safeWidth - margin.right to have space for axes
              padding: 0.4, //space between bars
            });
          }, [data, safeWidth]);

          const yScale = useMemo(() => {
            return scaleLinear({
              domain: [0, Math.max(...data.map((d) => d.value))],
              range: [safeHeight - margin.bottom, margin.top], //we reverse the range because in SVG y=0 is top and max value in bottom
            });
          }, [data, safeWidth]);
          //in our example the safeHeight is 290px so rang is [250,20]

          return (
            <motion.svg
              className={"bg-white"}
              width={safeWidth}
              height={safeHeight}
              viewBox={`0 0 ${safeWidth} ${safeHeight}`}
            >
              <defs>
                <pattern
                  id={patternId}
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                  patternTransform="rotate(45)"
                >
                  <rect width="8" height="8" fill="rgb(170, 220, 254)" />
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="3"
                  />
                </pattern>
              </defs>

              <Group>
                {/* AXES */}
                {showAxes && (
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    onAnimationComplete={() => setShowBars(true)}
                  >
                    <AxisBottom
                      top={safeHeight - margin.bottom}
                      scale={xScale}
                      stroke="transparent"
                      tickStroke="transparent"
                    />

                    <AxisLeft
                      left={margin.left}
                      scale={yScale}
                      tickValues={[0, 5000, 10000, 15000, 20000, 25000]}
                      stroke="transparent"
                      tickStroke="transparent"
                    />
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showAxes ? 1 : 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: "easeOut",
                      }}
                    >
                      <GridRows
                        scale={yScale}
                        width={safeWidth - margin.left - margin.right}
                        left={margin.left}
                        tickValues={[0, 5000, 10000, 15000, 20000, 25000]}
                        stroke="#e5e7eb"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                      />
                    </motion.g>
                  </motion.g>
                )}

                {showBars &&
                  data.map((d, i) => {
                    const barX = xScale(d.name);
                    const barWidth = xScale.bandwidth(); //bandWidth is the width of each bar
                    const barY = yScale(d.value); // the visual coordinate of the column apex exampl yScale(22000) = 45 this mean that bar apex will be at 45px from top of svg
                    const barHeight = yScale(0) - barY; // ارتفاع البار
                    // in our example yScale(0) = 250 and yScale(22000) = 45 so barHeight = 250 - 45 = 205px
                    const isActive = activeBar && activeBar === d.name;
                    const label = d.name;
                    const value = d.value.toLocaleString();
                    const tooltipWidth = 80;
                    const tooltipHeight = 50;
                    const tooltipX = barX - tooltipWidth - 10; //barX is start of bar if we write tooltip = barX tooltip will cover bar so we subtruct tooltipWdth of barX
                    const tooltipY = barY + 10; // barY if bar apex

                    return (
                      <React.Fragment key={d.name}>
                        <g>
                          {/* البار نفسه */}
                          <motion.rect
                            x={barX}
                            y={yScale(0)}
                            width={barWidth}
                            height={barHeight}
                            fill={`url(#${patternId})`}
                            rx={10}
                            initial={{ scaleY: 0, originY: 0 }}
                            animate={{ scaleY: -1 }} //we use -1 value for expanded to top
                            transition={{
                              duration: 0.9,
                              delay: i * 0.12 + 0.1,
                              ease: "easeOut",
                            }}
                            // مهم: هون بنحدث الـ state عند الـ hover
                            onMouseEnter={() => {
                              setActiveBar(
                                d.name,
                                // فوق البار شوي
                              );
                            }}
                            onMouseLeave={() => setActiveBar(null)}
                            className={"cursor-pointer"}
                          />

                          {/* الـ tooltip (مستطيل + نصوص) يظهر فقط عند الـ hover */}
                          {isActive && (
                            <motion.g
                              pointerEvents="none"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <rect
                                x={tooltipX}
                                y={tooltipY}
                                width={tooltipWidth}
                                height={tooltipHeight}
                                rx={8}
                                ry={8}
                                fill="#111827"
                              />
                              <polygon
                                points={`${barX - 5},${barY + 15} ${barX},${barY + 20} ${barX - 5},${barY + 25}`}
                                fill="#111827"
                              />
                              <text
                                x={tooltipX + tooltipWidth / 2}
                                y={tooltipY + 20}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontSize={13}
                                fontWeight="600"
                              >
                                {label}
                              </text>

                              <text
                                x={tooltipX + tooltipWidth / 2}
                                y={tooltipY + 38}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#e5e7eb"
                                fontSize={14}
                              >
                                {value}
                              </text>
                            </motion.g>
                          )}
                        </g>
                        <motion.rect
                          x={barX}
                          y={barY}
                          width={barWidth}
                          height={barHeight}
                          fill="#3b82f6"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ originY: 1 }}
                          rx={10}
                          pointerEvents="none"
                        />
                        {isActive && (
                          <motion.rect
                            x={barX - 2}
                            y={barY - 2}
                            width={barWidth + 4}
                            height={barHeight + 4}
                            rx={12}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            pointerEvents="none"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
              </Group>
            </motion.svg>
          );
        }}
      </ParentSize>
    </div>
  );
}
