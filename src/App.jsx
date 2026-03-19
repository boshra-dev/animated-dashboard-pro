import { useEffect, useState } from "react";
import LogoLoader from "./Components/UI/LogoLoader.jsx";
import { Menu } from "@headlessui/react";
import { ChevronDown, LogOut } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import AnimatedText from "./Components/UI/AnimatedText.jsx";
import { Search, Bell, MessageCircle, Menu as MenuIcon } from "lucide-react";
import Cards from "./Components/UI/Cards.jsx";
import SideBar from "./Components/UI/SideBar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import DateComponent from "./Components/UI/Date.jsx";
import DonutChart from "./Components/Charts/DonutChart.jsx";
import BarChartComponent from "./Components/Charts/BarChart.jsx";
import HeatMap from "./Components/Charts/HeatMap.jsx";
function App() {
  const [isMoved, setIsMoved] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ minWidth: 639 });
  const [targetWidth, setTargetWidth] = useState(0);
  const [showAxes, setShowAxes] = useState(false);
  const boxVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: [0, 0.2, 0.2, 1],
      transition: { duration: 1.8, ease: "easeOut", delay: 2 },
    },

    pulse: {
      width: "270px",

      transition: { duration: 0.8, delay: 2 },
    },

    moveToCorner: {
      height: "var(--header-height)",
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    fullWidth: {
      width: "100%",

      transition: { duration: 0.9, delay: 0.8, ease: "easeOut" },
    },
  };

  const sideBarVariants = {
    hidden: { width: "0px" },
    visible: {
      width: "192px",
      transition: { duration: 0.4, ease: "easeOut", delay: 0.8 },
    },
  };
  const textVariants = {
    hiddenText: { opacity: isDesktop ? 1 : 0 },
    showText: { opacity: 1 },
  };
  const contentVariants = {
    hiddenContent: { opacity: 0 },
    showContent: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 1.2 },
    },
  };

  const dateVariants = {
    hiddenDate: { width: 0 },

    visibleDate: {
      width: "var(--pill-max-width)",
      transition: { duration: 0.4, ease: "easeOut", delay: 1.3 },
    },
  };
  const elementAppearVariant = {
    hiddenElement: { opacity: 0, y: 10 },
    showElement: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
    },
  };

  const sideBarAndContentAppearVariant = {
    hidden: { display: "none" },
    flex: { display: "flex" },
  };

  useEffect(() => {
    async function sequence() {
      await parentControls.start("show");
      if (isDesktop) {
        await parentControls.start("pulse");
      }
      await new Promise((res) => setTimeout(res, 1200));
      contenerControles.start("corner");
      (await new Promise((res) => setTimeout(res, 500)), setIsMoved(true));

      await parentControls.start("moveToCorner");

      await Promise.all([
        parentControls.start("fullWidth"),
        sideBarAndContentAppearControl.start("flex"),
        sideBarControles.start("visible"),
        contentControles.start("showContent"),

        dateControles.start("visibleDate"),
      ]);

      await elementAppearControl.start("showElement");
      await cardsControles.start("show");

      await Promise.all([
        panelControles.start("show"),
        icanAndTitleControl.start("show"),
        numberControls.start("show"),
      ]);
      percentControles.start("show");
      await barChartContainerControles.start("show");
      await heatMapContainerControle.start("show");
      setShowAxes(true);
      (await new Promise((res) => setTimeout(res, 900)), setShowCells(true));
    }
    sequence();
  }, []);

  const parentControls = useAnimation();
  const textControl = useAnimation();
  const sideBarControles = useAnimation();
  const contentControles = useAnimation();
  const dateControles = useAnimation();
  const elementAppearControl = useAnimation();
  const contenerControles = useAnimation();
  const sideBarAndContentAppearControl = useAnimation();
  const cardsControles = useAnimation();
  const panelControles = useAnimation();
  const icanAndTitleControl = useAnimation();
  const numberControls = useAnimation();
  const percentControles = useAnimation();
  const barChartContainerControles = useAnimation();
  const heatMapContainerControle = useAnimation();
  const [showCells, setShowCells] = useState(false);
  return (
    <>
      <div className=" min-h-[100dvh] flex flex-col w-full bg-gray-100 p-4 md:p-6 lg:p-8  ">
        <motion.div
          className={`p-2 md:p-2 lg:p-3 rounded-2xl flex flex-col flex-1  min-h-0 h-full  w-full    bg-blue-100
       ${isMoved ? "justify-start items-start " : "justify-center items-center"}
      `}
          transition={{
            layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Top Bar */}
          <motion.div
            className={` ${isMoved ? "    py-2 sm:py-2.5 lg:py-3 h-12 md:h-[52px] lg:h-[58px] " : ""} flex items-center justify-between relative 
            w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36
            rounded-full     bg-white  `}
            variants={boxVariants}
            initial="hidden"
            animate={parentControls}
            layout
            onAnimationComplete={(def) => {
              if (def === "pulse") textControl.start("showText");
            }}
          >
            {/* Left Side */}
            <motion.div className="pl-2 flex   items-center  ">
              <motion.div
                initial={{ display: "none" }}
                animate={{ display: "block" }}
                transition={{ delay: 4 }}
              >
                <motion.div
                  className={`${isMoved ? "w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18" : "w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 "}`}
                  initial={false}
                  animate={{
                    scale: isMoved ? 0.9 : 1,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    scale: isMoved ? 0.8 : 1,
                  }}
                >
                  <LogoLoader className="block" />
                </motion.div>
              </motion.div>

              <motion.div
                variants={textVariants}
                initial="hiddenText"
                animate={textControl}
                className="hidden lg:block"
              >
                <AnimatedText text="Metrics" isMoved={isMoved} />
              </motion.div>
              <motion.div
                className="flex"
                initial="hiddenElement"
                animate={elementAppearControl}
                variants={elementAppearVariant}
              >
                <MenuIcon
                  onClick={() => setIsSideBarOpen((pre) => !pre)}
                  className="block lg:hidden order-first w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 "
                  color="black"
                />
              </motion.div>
            </motion.div>

            {/* Right Side */}
            <motion.div
              className=" flex gap-2 md:gap-3 lg:gap-4 items-center flex-1 justify-end pr-2 "
              initial="hiddenElement"
              animate={elementAppearControl}
              variants={elementAppearVariant}
            >
              <div className=" hidden md:block relative flex-1 min-w-0  md:max-w-[280px] lg:max-w-[420px]">
                <input
                  type="search"
                  className="bg-gray-100 pl-10 pr-4 py-2 focus:outline-none w-full    rounded-full "
                  placeholder="Search"
                />
                <Search
                  className="absolute top-2 left-2 w-4 h-4 md:w-5 h-5 lg:w-6 h-6 "
                  color="#545454"
                />
              </div>

              <Search
                className=" block lg:hidden w-4 h-4 md:w-5 h-5 lg:w-6 h-6 "
                color="#545454"
                onClick={() => setSearchOpen(true)}
              />

              <div className="flex-shrink-0 p-1.5 md:p-2   flex justify-center items-center bg-gray-100 rounded-full">
                <MessageCircle
                  color="#545454 "
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
              </div>
              <div className="flex-shrink-0 p-1.5 md:p-2 flex justify-center items-center bg-gray-100 rounded-full">
                <Bell
                  color="#545454"
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
              </div>
              <div className="flex-shrink-0 w-0.5 h-8 bg-gray-100"></div>

              <Menu as="div" className="relative">
                {/* Trigger */}
                <Menu.Button
                  className="flex items-center gap-2 rounded-full bg-gray-100   px-1 py-1
  sm:px-2 sm:py-1.5
  md:px-3 md:py-2
  lg:px-4 lg:py-2  hover:bg-gray-200"
                >
                  <img
                    src="../src/assets/Images/photo_2026-01-20_14-40-57.jpg"
                    alt="user"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-sm font-medium">
                    Boshra
                  </span>
                  <ChevronDown className="h-4 w-4 hidden md:block" />
                </Menu.Button>
                <AnimatePresence>
                  <Menu.Items
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg overflow-hidden"
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`flex w-full items-center gap-2 px-4 py-2 text-sm
                ${active ? "bg-gray-100" : ""}`}
                        >
                          <LogOut className="" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </AnimatePresence>
              </Menu>
            </motion.div>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 px-4 z-50 bg-white rounded-full  flex items-center gap-3"
                >
                  <input
                    type="search"
                    className="flex-1 bg-gray-100  rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 px-4 h-10"
                    placeholder="search"
                  />
                  <button
                    className="text-sm font-medium text-gray-600 hover:text-black"
                    onClick={() => setSearchOpen(false)}
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side Bar And Content Container */}
          <motion.div
            className=" mt-3 md:mt-4 lg:mt-5 flex flex-1 w-full overflow-hidden "
            initial="hidden"
            variants={sideBarAndContentAppearVariant}
            animate={sideBarAndContentAppearControl}
          >
            {/** Side Bar **/}

            <SideBar
              variants={sideBarVariants}
              controles={sideBarControles}
              tabsInitial="hiddenElement"
              tabsAnimate={elementAppearControl}
              tabsVariant={elementAppearVariant}
              isSideBarOpen={isSideBarOpen}
            />

            {/* Content*/}
            <div className="flex-1 flex flex-col  bg-transparent pl-0 lg:pl-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between  w-full h-fit">
                <motion.div
                  initial="hiddenContent"
                  animate={contentControles}
                  variants={contentVariants}
                  className="text-base sm:text-lg lg:text-xl font-medium "
                >
                  Sales Overview
                </motion.div>
                <DateComponent
                  dateAnimate={"visibleDate"}
                  dateVariants={dateVariants}
                  elementAppearControl={elementAppearControl}
                  elementAppearVariant={elementAppearVariant}
                  isMobile={isMobile}
                  targetWidth={targetWidth}
                  setTargetWidth={setTargetWidth}
                  dateControles={dateControles}
                />
              </div>

              <div className="flex flex-1  flex-col">
                <div className="grid grid-col-1 grid-row-2 md:grid-cols-[2fr_1fr] md:grid-rows-1 gap-2 min-h-[400px] md:min-h-1/2 mt-2">
                  <Cards
                    controles={cardsControles}
                    icanAndTitleControl={icanAndTitleControl}
                    percentControles={percentControles}
                    numberControls={numberControls}
                  />
                  <DonutChart controles={panelControles} />
                </div>

                {/**BarChart And Heatmap */}
              </div>
              <div className="flex flex-1  flex-col ">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  h-auto gap-4 mt-2 ">
                  <motion.div
                    className="min-w-0 bg-white rounded-lg h-[300px] "
                    initial={{ opacity: 0, y: 20 }}
                    animate={barChartContainerControles}
                    variants={{
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: "easeOut" },
                      },
                    }}
                  >
                    <BarChartComponent
                      controles={barChartContainerControles}
                      showAxes={showAxes}
                    />
                  </motion.div>
                  <motion.div
                    className="min-w-0 bg-white rounded-lg h-auto md:h-[300px]  "
                    initial={{ opacity: 0, y: 20 }}
                    variants={{
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: "easeOut" },
                      },
                    }}
                    animate={heatMapContainerControle}
                  >
                    {" "}
                    <HeatMap showCells={showCells} showAxes={showAxes} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 bg-white w-full h-full"
          initial={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          animate={{
            clipPath: [
              // المرحلة الأولى: الشفرة تصعد من الأسفل لمنتصف المستطيل
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)",

              "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 90%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 80%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 70%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 40% 100%, 0% 60%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 50%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 60% 100%, 0% 40%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 70% 100%, 0% 30%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 80% 100%, 0% 20%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 90% 100%, 0% 10%)",

              // المرحلة الثانية: رأس الشفرة ينتقل تدريجيًا إلى الزاوية العلوية اليمنى
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 90%, 10% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 80%, 20% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 70%, 30% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 60%, 40% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 50%, 50% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 40%, 60% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 30%, 70% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 20%, 80% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 100% 10%, 90% 0%)",

              // النهاية: الشفرة تصل للزاوية العلوية اليمنى
              "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%)",
            ],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: Array.from({ length: 22 }, (_, i) => i / 20),
          }}
        />
      </div>
    </>
  );
}

export default App;
