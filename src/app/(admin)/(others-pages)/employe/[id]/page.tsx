import { Metadata } from "next";
import NewEmployee from "@/components/ecommerce/new-employee";
export const metadata: Metadata = {
  title: "Quess Profile | Quess - Quess Dashboard Template",
  description:
    "This is Quess Profile page for Quess - Quess Tailwind CSS Admin Dashboard Template",
};

export default async function Profile({params}:{params:{id:string}}) {
  const { id } = await params;
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
        <NewEmployee id={id} />
        </div>
      </div>
    </div>
  );
}
