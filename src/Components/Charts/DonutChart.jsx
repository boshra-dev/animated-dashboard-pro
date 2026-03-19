import { motion, useAnimation } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import CustomLegend from "./CustomLegend";
import AnimatedNumber from "../UI/AnimatedNumbers";
export default function DonutChart({ controles }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const donutNumberControl = useAnimation();

  const colors = ["#eb4a4a", "yellow", "#7c3aed"];
  const headerVariant = {
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  };
  const headerControle = useAnimation();
  const data = [
    { name: "Shipped", uv: 430 },

    { name: "Delvered", uv: 3500 },
    { name: "Return", uv: 1500 },
  ];
  const sortedData = [...data].sort((a, b) => a.uv - b.uv);
  const total = data.reduce((sum, item) => sum + item.uv, 0).toLocaleString();
  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => {
        donutNumberControl.start("show");
      }, 900);
    }
  }, [showAnimation]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={controles}
      variants={{
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
      className="bg-white rounded-lg  p-3"
      onAnimationComplete={() => (
        headerControle.start("show"),
        setShowAnimation(true)
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={headerControle}
        variants={headerVariant}
        className="w-full h-full flex flex-col justify-between"
      >
        <div className="flex justify-between">
          <h2 className="font-medium">Order Information</h2>
          <Ellipsis className="opacity-60 hover:opacity-100 transition" />
        </div>
        <div className="relative w-full h-[220px] sm:h-[260px] md:h-full">
          {showAnimation && (
            <ResponsiveContainer
              width="100%"
              height="100%"
              style={{ overflow: "visible" }}
            >
              <PieChart>
                <Pie
                  data={sortedData}
                  dataKey="uv"
                  innerRadius="80%"
                  outerRadius="100%"
                  cornerRadius="50%"
                  paddingAngle={5}
                  isAnimationActive
                  animationDuration={1000}
                  animationEasing="ease-out"
                  animationBegin={900}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}

          <div className="absolute inset-0  flex flex-col gap-0.5 items-center justify-center pointer-events-none">
            <AnimatedNumber
              value={total}
              hasAnimated={false}
              controle={donutNumberControl}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={donutNumberControl}
              variants={{ show: { opacity: 1 } }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-gray-500">Total Order</span>
            </motion.div>
          </div>
        </div>
        <CustomLegend data={data} colors={colors} />
      </motion.div>
    </motion.div>
  );
}
