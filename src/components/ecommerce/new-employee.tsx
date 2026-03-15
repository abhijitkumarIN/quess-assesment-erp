'use client';
import React from 'react'
import UserMetaCard from '../user-profile/UserMetaCard'
import UserInfoCard from '../user-profile/UserInfoCard'
import UserAddressCard from '../user-profile/UserAddressCard'
import { useState, useEffect } from "react";
import { Employee } from "@/components/ecommerce/Employes";

export default function NewEmployee({id}:{id:string}) {
     
   const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.API_URL}/employees/${id}`
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
    }, [id]);
  console.log(employees ,' ===== ');
    return (
        <>
          <UserMetaCard employees={employees} />
              <UserInfoCard employees={employees} />
              <UserAddressCard  employees={employees} />
              </>
    )
}
