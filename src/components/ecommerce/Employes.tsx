"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useForm } from "react-hook-form";
import Link from "next/link";
// Define the TypeScript interface for the Employee based on API response
export interface Employee {
  id: number;
  email: string;
  name: string;
  department: string;
  facebook?: string;
  instagram?: string;
  xhandler?: string;
  linkedin?: string;
  bio?: string;
  contact_number?: string;
  country?: string;
  state?: string;
  postal_code?: string;
  created_at?: string;
  is_present_today?: boolean;
  today_attendance_status?: string;
  today_check_in_time?: string | null;
}

// Form data type
interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  department: string;
  facebook: string;
  xhandler: string;
  linkedin: string;
  instagram: string;
}

export default function RecentOrders() {
    const { isOpen, openModal, closeModal } = useModal();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      department: "",
      facebook: "",
      xhandler: "",
      linkedin: "",
      instagram: "",
    },
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.API_URL}/employees/?skip=0&limit=100`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data: Employee[] = await response.json();
        setEmployees(data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employees");
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle form submission
  const onSubmit = async (data: EmployeeFormData) => {
    setSubmitting(true);
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      
      const response = await fetch(
        `${process.env.API_URL}/employees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email: data.email,
            contact_number: data.phone,
            department: data.department,
            bio: data.bio,
            facebook: data.facebook || '',
            xhandler: data.xhandler || '',
            linkedin: data.linkedin || '',
            instagram: data.instagram || '',
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      const newEmployee: Employee = await response.json();
      setEmployees([newEmployee, ...employees]);
      reset();
      closeModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create employee");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.API_URL}/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== id));
      } else {
        throw new Error("Failed to delete employee");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete employee");
    }
  };

  return (
    <>
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Employee List
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={openModal} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Add Employee
          </button>
          <button className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
     
        </div>
      </div>
      {
        !loading && employees.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">No employees found.</p>
          </div>
        )
      }
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Loading employees...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : !( !loading && employees.length === 0 ) && (
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Employee Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Department
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Presentation
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {employees.map((employee) => (
                <TableRow key={employee.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-200">
                        <Link href={`/employees/${employee.id}`} className="flex items-center justify-center h-full w-full">
                        <div className="flex items-center justify-center h-[50px] w-[50px] bg-blue-500 text-white font-medium">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>
                        </Link>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                         <Link href={`/employe/${employee.id}`} className="flex underline items-center justify-center h-full w-full">
                          {employee.name}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.email}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.department}
                  </TableCell>
                  <TableCell className="py-3 capitalize text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        employee.today_attendance_status === "Present"
                          ? "success"
                          : employee.today_attendance_status === "Absent"
                          ? "warning"
                          : "warning"
                      }
                      
                    >
                      {employee.today_attendance_status || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <Badge size="sm" color={"error"}>
                        Delete
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>

    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add Employee
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Add your details to keep employee profile 
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      placeholder="https://facebook.com/username"
                      {...register("facebook")}
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input 
                      type="text" 
                      placeholder="https://x.com/username"
                      {...register("xhandler")} 
                    />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      {...register("linkedin")}
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      placeholder="https://instagram.com/username"
                      {...register("instagram")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Employee Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>
                      First Name <span className="text-error-500">*</span>
                    </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter first name"
                      error={!!errors.firstName}
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>
                      Last Name <span className="text-error-500">*</span>
                    </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter last name"
                      error={!!errors.lastName}
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>
                      Email Address <span className="text-error-500">*</span>
                    </Label>
                    <Input 
                      type="email" 
                      placeholder="Enter email address"
                      error={!!errors.email}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>
                      Phone <span className="text-error-500">*</span>
                    </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter phone number"
                      error={!!errors.phone}
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: "Invalid phone number",
                        },
                        minLength: {
                          value: 10,
                          message: "Phone number must be at least 10 digits",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input 
                      type="text" 
                      placeholder="Enter bio"
                      {...register("bio")} 
                    />
                  </div>
                       <div className="col-span-2">
                    <Label>
                      Department <span className="text-error-500">*</span>
                    </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter department"
                      error={!!errors.department}
                      {...register("department", {
                        required: "Department is required",
                      })}
                    />
                    {errors.department && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                type="button"
                onClick={() => {
                  reset();
                  closeModal();
                }}
              >
                Close
              </Button>
              <Button 
                size="sm" 
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
