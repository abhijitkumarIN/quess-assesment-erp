import { Metadata } from "next";
import NewEmployee from "@/components/ecommerce/new-employee";

export const metadata: Metadata = {
  title: "Employee Profile | Quess - Modern Dashboard",
  description:
    "Employee profile management page with modern UI design",
};

export default async function Profile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 rounded-md">
      <div className="max-w-7xl !rounded-md mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Main Content Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-200 dark:border-rose-700 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Profile Details</h2>
                <p className="text-rose-100 text-sm">Complete employee information</p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <div className="space-y-6">
              <NewEmployee id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}