import { Calendar, ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
export default function DateComponent({
  dateControles,
  dateVariants,
  elementAppearControl,
  elementAppearVariant,
 
}) {
  const [startDate, setStartDate] = useState(new Date("2024-01-27"));
  const [endDate, setEndDate] = useState(new Date("2024-02-06"));
  const formateDate = (date) => format(date, "MMM d,yyyy");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  return (
    <div className="relative w-[var(--pill-max-width)] "
     ref={containerRef}
    >
      <motion.div
  variants={dateVariants}
  animate={dateControles}
  initial="hiddenDate"
  layout
  className="w-var(--pill-max-width)"
  style={{transformOrigin:"left"}}
        onClick={() => setIsOpen((pre) => !pre)}
      >
        <div className="w-full  hover:bg-gray-50 active:scale-[0.98] transition rounded-full flex items-center justify-center  bg-white h-9 sm:h-10 lg:h-11 text-sm lg:text-base">
          <motion.div
            className="  flex  items-center  whitespace-nowrap gap-2 text-xs sm:text-base  "
            initial="hiddenElement"
            animate={elementAppearControl}
            variants={elementAppearVariant}
            ref={contentRef}
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="flex">
              <span>{formateDate(startDate)}</span>-
              <span>{formateDate(endDate)}</span>
            </div>
            <ChevronDownIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className=" absolute z-50 top-full h-96 right-0 mt-2 "
            >
              <DatePicker
                className=""
                onChange={(date) => {
                  const [start, end] = date;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
