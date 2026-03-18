"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  color?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    name: "Analytics Dashboard",
    path: "/",
    color: "from-indigo-600 to-indigo-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    name: "Employee Management",
    path: "#",
    color: "from-teal-600 to-teal-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    name: "Reports & Analytics",
    path: "#",
    color: "from-pink-600 to-pink-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    name: "Settings",
    path: "#",
    color: "from-red-600 to-red-600",
  },
];


const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-3">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group relative w-full flex items-center px-2 py-1 !rounded-md  transition-all duration-300 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? " "
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" 
              }  !rounded-md cursor-pointer ${
                !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? " "
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
                {nav.icon}
              </div>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="ml-3 font-medium text-sm">{nav.name}</span>
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-300 ${
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`group relative w-full flex items-center px-3 py-1 !rounded-md transition-all duration-300 ${
                  isActive(nav.path)
                    ? "bg-gradient-to-r " + (nav.color || "from-blue-500 to-indigo-600") + " text-white "
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                  isActive(nav.path)
                    ? " "
                    : "bg-gray-100 dark:bg-gray-800 "
                }`}>
                  {nav.icon}
                </div>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-3 font-medium text-sm">{nav.name}</span>
                )}
                {isActive(nav.path) && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-12">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive(subItem.path)
                          ? "bg-white/20 text-white font-medium"
                          : "text-gray-500 dark:text-gray-400 hover:text-white"
                      }`}
                    >
                      <span>{subItem.name}</span>
                      <span className="flex items-center gap-1">
                        {subItem.new && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                            new
                          </span>
                        )}
                    
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 shadow-xl backdrop-blur-sm
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section with Gradient Background */}
      <div
        className={`py-8 flex relative ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <div className="absolute inset-0  rounded-2xl"></div>
        <Link href="/" className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-full rounded-2xl p-3 shadow-lg border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="./images/logo/auth-logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="./images/logo/auth-logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {/* Menu Header */}
              <div className={`mb-6 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                {isExpanded || isHovered || isMobileOpen ? (
                  <div className="flex items-center space-x-2 ">
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Navigation
                    </h2>
                  </div>
                ) : ''}
              </div>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? (
          <div className="mt-auto">
            <SidebarWidget />
          </div>
        ) : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
