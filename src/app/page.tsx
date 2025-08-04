"use client";

import { useEffect, useState } from "react";
import { advocateData } from "../db/seed/advocates";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string;
  phoneNumber: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const formatPhoneNumber = (phoneNumber: string | number) => {
    const phoneStr = String(phoneNumber);
    const cleaned = phoneStr.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phoneStr;
  };

  useEffect(() => {
    // Using API route which handles both database and seed data options
    // The API route is configured to use seed data for demo/deployment purposes
    console.log("fetching advocates from API...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        // Format the data to ensure consistent types
        const formattedAdvocates = jsonResponse.data.map((advocate: any) => ({
          ...advocate,
          yearsOfExperience: advocate.yearsOfExperience.toString(),
          phoneNumber: advocate.phoneNumber.toString()
        }));
        setAdvocates(formattedAdvocates);
        setFilteredAdvocates(formattedAdvocates);
      });
    }).catch((error) => {
      console.error("Error fetching advocates:", error);
      // Fallback to direct seed data if API fails
      const formattedAdvocates = advocateData.map(advocate => ({
        ...advocate,
        yearsOfExperience: advocate.yearsOfExperience.toString(),
        phoneNumber: advocate.phoneNumber.toString()
      }));
      setAdvocates(formattedAdvocates);
      setFilteredAdvocates(formattedAdvocates);
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchValue.toLowerCase()) ||
        advocate.specialties.some(specialty => specialty.toLowerCase().includes(searchValue.toLowerCase())) ||
        advocate.yearsOfExperience.toString().includes(searchValue)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="min-h-screen bg-solace-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-solace-green-900 to-solace-green-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl font-mollie font-bold text-white tracking-wide">Solace Advocates</h1>
          <p className="mt-3 text-xl text-solace-green-100">Find experienced healthcare advocates to help navigate your care</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3">
              Search Advocates
            </label>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  placeholder="Search by name, city, degree, or specialty..."
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-slate-900 placeholder-slate-400"
                  onChange={onChange}
                />
              </div>
              <button
                onClick={onClick}
                className="px-8 py-3 bg-solace-green-900 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-900 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Reset Search
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-600 bg-white rounded-lg p-3">
            Searching for: <span className="font-semibold text-teal-700">{searchTerm}</span>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 bg-white rounded-lg p-4 border-l-4 border-teal-500">
          <p className="text-lg font-semibold text-slate-800">
            {filteredAdvocates.length} advocate{filteredAdvocates.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Advocates Table */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th key="name" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th key="location" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th key="credentials" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Credentials
                  </th>
                  <th key="specialties" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Specialties
                  </th>
                  <th key="experience" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Experience
                  </th>
                  <th key="contact" className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredAdvocates.map((advocate, index) => (
                  <tr key={index} className="hover:bg-slate-100 transition-all duration-200">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-900">
                        {advocate.firstName} {advocate.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-slate-700">{advocate.city}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-lg inline-block">
                        {advocate.degree}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {advocate.specialties.map((specialty, specialtyIndex) => {
                          const colors = [
                            'bg-teal-100 text-teal-800 border-teal-200',
                            'bg-blue-100 text-blue-800 border-blue-200',
                            'bg-indigo-100 text-indigo-800 border-indigo-200',
                            'bg-purple-100 text-purple-800 border-purple-200',
                            'bg-emerald-100 text-emerald-800 border-emerald-200'
                          ];
                          const colorClass = colors[specialtyIndex % colors.length];
                          return (
                            <span
                              key={specialtyIndex}
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
                            >
                              {specialty}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-700">
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-lg">
                          {advocate.yearsOfExperience} years
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <a
                        href={`tel:${advocate.phoneNumber}`}
                        className="text-sm font-semibold text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-2 rounded-lg transition-all duration-200 inline-block"
                      >
                        {formatPhoneNumber(advocate.phoneNumber)}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAdvocates.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-500">
                <svg className="mx-auto h-16 w-16 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No advocates found</h3>
                <p className="mt-2 text-slate-600">Try adjusting your search criteria to find the right advocate for you.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
