import React from "react";
export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl py-8 px-2 text-center border border-blue-200 dark:border-blue-700 shadow-lg`}
    >
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Quess HR ERP
      </h1>
      <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
        Quess HR ERP is a comprehensive human resource management system.
      </p>
    </div>
  );
}
