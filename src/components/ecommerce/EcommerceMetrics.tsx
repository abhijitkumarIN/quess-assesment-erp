"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";

interface EmployeeInsights {
  total_employees: number;
  present_employees: number;
  absent_employees: number;
}

export const EcommerceMetrics = () => {
  const [data, setData] = useState<EmployeeInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch(`${process.env.API_URL}/employees/employee_insights`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch employee insights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="mt-5 h-20 flex items-end justify-between">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded"></div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="mt-5 h-20 flex items-end justify-between">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 bg-gradient-to-r from-emerald-500 to-teal-500 ">
          <GroupIcon className="text-white size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
         <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium"> Total Employee</span>
              </div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90 !text-blue-400 ">
              {data?.total_employees ?? 0}
            </h4>
          </div>

            <div>
                <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">Present Employee
                </span>
              </div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90 text-green-400">
              {data?.present_employees ?? 0}
            </h4>
          </div>
        
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 bg-gradient-to-r from-emerald-500 to-teal-500 ">
          <GroupIcon className="text-white size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
                      <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">Absent Employee</span>
              </div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90 text-purple-400">
              {data?.absent_employees ?? 0}
            </h4>
          </div>

         
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
