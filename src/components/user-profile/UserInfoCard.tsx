"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { useForm } from "react-hook-form";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  department: string;
  status: string;
}

export default function UserInfoCard({ employees }: { employees: any }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [submitting, setSubmitting] = React.useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      department: "",
      status: "Present",
    },
  });

  // Set form values when employee data is loaded
  React.useEffect(() => {
    if (employees && employees.id) {
      const nameParts = (employees.name || "").split(" ");
      setValue("firstName", nameParts.at(0) || "");
      setValue("lastName", nameParts.at(-1) || "");
      setValue("email", employees.email || "");
      setValue("phone", employees.contact_number || employees.phone || "");
      setValue("bio", employees.bio || "");
      setValue("department", employees.department || "");
      // Ensure status is properly set with correct capitalization
      const currentStatus = employees.today_attendance_status || employees.status || "Present";
      setValue("status", currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).toLowerCase());
    }
  }, [employees, setValue]);

  // Handle form submission
  const onSubmit = async (data: EmployeeFormData) => {
    if (!employees?.id) {
      alert("Employee ID not found");
      return;
    }

    setSubmitting(true);
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      
      const response = await fetch(
        `${process.env.API_URL}/employees/${employees.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email: data.email,
            contact_number: data.phone,
            bio: data.bio,
            department: data.department,
            today_attendance_status: data.status,
          }),
        }
      );

      console.log("Response status:", response.status);
      

      const updatedEmployee = await response.json();
      console.log("Updated employee:", updatedEmployee);
      closeModal();
;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update employee");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 p-6 dark:border-slate-700/60 dark:bg-slate-800/80 dark:shadow-slate-900/20">
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Information
        </h4>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.name?.split(' ').at(0) || ""}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Last Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.name?.split(' ').at(-1) || ""}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.email || ""}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Phone
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.contact_number || employees?.phone || ""}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Bio
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.bio || ""}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Department
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.department || ""}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Status
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {employees?.today_attendance_status || employees?.status || ""}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={openModal}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
      >
        <svg
          className="fill-current"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
            fill=""
          />
        </svg>
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update employee details to keep information current.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
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

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Bio</Label>
                    <Input 
                      type="text" 
                      placeholder="Enter bio"
                      {...register("bio")} 
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Department</Label>
                    <Input 
                      type="text" 
                      placeholder="Enter department"
                      {...register("department")} 
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Status</Label>
                    <Select 
                      options={[
                        {value:'Present', label:'Present'},
                        {value:'Absent', label:'Absent'}
                      ]} 
                      register={register("status")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                type="button"
                onClick={handleClose}
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
    </div>
  );
}