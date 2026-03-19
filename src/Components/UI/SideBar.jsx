import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Box,
  Users,
  BarChart3,
  Store,
  Plug,
  Percent,
  Receipt,
  Settings,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils";
import { useMediaQuery } from "react-responsive";
export default function SideBar({
  variants,
  controles,
  tabsInitial,
  tabsAnimate,
  tabsVariant,
  isSideBarOpen,
}) {
  const tabs = [
    {
      id: 1,
      title: "Menu",
      links: [
        { id: 1, icon: LayoutDashboard, label: "Dashboard", to: "/" },
        {
          id: 2,
          icon: ShoppingCart,
          label: "Order",
          to: "/order",
        },
        {
          id: 3,
          icon: Box,
          label: "Products",
          to: "/products",
        },
        {
          id: 4,
          icon: Users,
          label: "Customers",
          to: "/users",
        },
        {
          id: 5,
          icon: BarChart3,
          label: "Report",
          to: "/report",
        },
      ],
    },
    {
      id: 2,
      title: "Tools",
      links: [
        {
          id: 1,
          icon: Store,
          label: "My Store",
          to: "/myStore",
        },
        {
          id: 2,
          icon: Plug,
          label: "Integration",
          to: "/integration",
        },
        {
          id: 3,
          icon: Percent,
          label: "Descount",
          to: "descount",
        },
        {
          id: 4,
          icon: Receipt,
          label: "Invoice",
          to: "invoice",
        },
      ],
    },
    {
      id: 3,
      title: "Support",
      links: [
        { id: 1, icon: Settings, label: "Settings", to: "/settings" },
        { id: 2, icon: HelpCircle, label: "Help Desc", to: "/helpDesc" },
      ],
    },
  ];
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const sideBarVariant = {
    hidden: {
      x: "-150%",
    },
    visible: {
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isDesktop ? "visible" : isSideBarOpen ? "visible" : "hidden"}
      variants={sideBarVariant}
      className="fixed lg:static h-fit lg:h-full   bg-white rounded-2xl z-40 lg:z-0 "
    >
      <motion.div
        className=" "
        initial="hidden"
        variants={variants}
        animate={controles}
      >
        <div className="w-full h-full px-3 py-1 sm:px-4 sm:py-2 lg:px-5 lg:py-3">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              initial={tabsInitial}
              animate={tabsAnimate}
              variants={tabsVariant}
            >
              <div className="mb-2">{tab.title}</div>
              {tab.links.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg mt-1 text-sm lg:text-base",
                      isActive
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-gray-500 hover:bg-gray-100",
                    )
                  }
                >
                  <link.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  {link.label}
                </NavLink>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
