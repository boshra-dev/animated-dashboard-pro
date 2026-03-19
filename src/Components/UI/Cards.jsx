import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Box,
  CircleDollarSign,
  Ellipsis,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import AnimatedNumber from "./AnimatedNumbers";

export default function Cards({
  controles,
  icanAndTitleControl,
  percentControles,
  numberControls,
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardsInfo = [
    {
      icons: CircleDollarSign,
      title: "Total Revenue",
      number: "$145,500",
      time: "From last weeks",
      x: ArrowUp,
      percent: "12.25%",
    },
    {
      icons: ShoppingBag,
      title: "Average Order",
      number: "$1,250",
      time: "From last weeks",
      x: ArrowUp,
      percent: "10%",
    },
    {
      icons: UsersRound,
      title: "Total Customers",
      number: "650",
      time: "From last weeks",
      x: ArrowUp,
      percent: "8%",
    },
    {
      icons: Box,
      title: "Product Sold",
      number: "450",
      time: "From last weeks",
      x: ArrowDown,
      percent: "8%",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };
  const iconTitle = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="  grid grid-col-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-2 bg-transparent"
      variants={containerVariants}
      initial="hidden"
      animate={controles}
    >
      {cardsInfo.map((card) => (
        <div key={card.title} className="bg-gray-100 rounded-lg p-3 ">
          <motion.div
            className="flex justify-between"
            variants={iconTitle}
            initial="hidden"
            animate={icanAndTitleControl}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
              <div className="p-2 flex items-center justify-center bg-violet-100 rounded-md ">
                <card.icons className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-violet-600" />
              </div>
              <h4 className="text-sm md:text-base font-medium">{card.title}</h4>
            </div>
            <Ellipsis className="opacity-60 hover:opacity-100 transition" />
          </motion.div>
          <div className="flex gap-2 font-semibold  mt-2">
            <AnimatedNumber
              value={card.number}
              hasAnimated={hasAnimated}
              controle={numberControls}
            />
            <motion.div
              className={`flex items-center gap-1 p-1 text-xs sm:text-sm ${card.x === ArrowUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}  rounded-md`}
              initial={{ opacity: 0, y: 10 }}
              animate={percentControles}
              variants={{
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <card.x className=" w-3 sm:w-3.5" />
              {card.percent}
            </motion.div>
          </div>
          <motion.p
            className="text-xs  mt-1 text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={percentControles}
            variants={{
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {card.time}
          </motion.p>
        </div>
      ))}
    </motion.div>
  );
}
