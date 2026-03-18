import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import RecentOrders from "@/components/ecommerce/Employes";

export const metadata: Metadata = {
  title: "Quess - Employee Management Platform",
  description: "Monitor employee metrics and manage workforce efficiently",
};

export default function Ecommerce() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 rounded-md">
      <div className="max-w-7xl !rounded-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Colorful Header with Gradient */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200 dark:border-blue-700 shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Employee Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Real-time employee insights and workforce management
                </p>
              </div>
            </div>

            {/* Colorful Status Indicators */}
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Present Employee
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium"> Total Employee</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Absent Employee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Metrics Section with Colorful Background */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl"></div>
          <div className="relative p-6 rounded-3xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Employee Metrics
              </h2>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm ml-11">Live workforce statistics</p>
            </div>
            <EcommerceMetrics />
          </div>
        </div>

        {/* Colorful Employee Management Section */}
        <div className="">
          <div className=" bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-200 dark:border-rose-700 overflow-hidden">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Employee Management</h2>
                  <p className="text-rose-100 text-sm">Manage your workforce efficiently</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <RecentOrders />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
