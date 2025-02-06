import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ministryofhealthandfamilywelfarecomplaints, ministryofhealthandfamilywelfarecategories } from "../data/complaints";

const MinistryofHealthandFamilyWelfare = () => {
    const { gov_id } = useParams();
    const allcomplaints = ministryofhealthandfamilywelfarecomplaints;
    const allcategories = ministryofhealthandfamilywelfarecategories;

    const [categories] = useState(allcategories);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [complaints, setComplaints] = useState(allcomplaints);

    // Filter complaints when category changes
    useEffect(() => {
        if (selectedCategory === "All") {
            setComplaints(allcomplaints);
        } else {
            setComplaints(allcomplaints.filter(complaint => complaint.category === selectedCategory));
        }
    }, [selectedCategory, allcomplaints]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-6 md:p-12 flex flex-col items-center">
            {/* Header */}
            <div className="text-center flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Ministry of Health and Family Welfare 🏥
                </h1>
                <p className="text-gray-600 max-md:text-sm text-lg mt-2 font-semibold">
                    Ensuring accessible, affordable, and quality healthcare services for all citizens.
                    The ministry oversees public health programs, medical institutions, disease prevention initiatives,
                    and family welfare policies to promote the well-being of individuals and communities across the nation.
                </p>
                <p className="text-gray-500">Department ID: <b>{gov_id}</b></p>
            </div>

            {/* Category Selection */}
            <div className="mt-8 w-full max-w-md">
                <label className="block text-lg text-gray-700 font-semibold mb-2">Select Category</label>
                <select
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 transition"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Complaints Section */}
            <div className="mt-12 w-full max-w-5xl">
                <h2 className="text-2xl font-semibold text-gray-800">List of Complaints</h2>
                <ul className="mt-4 bg-white shadow-lg rounded-lg p-6 divide-y divide-gray-200">
                    {complaints.length > 0 ? complaints.map(complaint => (
                        <li key={complaint.id} className="py-3 px-4 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition rounded-md">
                            <div className="flex max-md:text-sm justify-center items-center gap-3 capitalize font-semibold">
                                <div>{complaint.category.split(" ").pop()}</div>
                                <div>{complaint.complaint}</div>
                            </div>
                            <div className="text-gray-600 text-xs">~👤 {complaint.author}</div>
                        </li>
                    )) : (
                        <p className="text-gray-500 text-center py-4">No complaints found for this category.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MinistryofHealthandFamilyWelfare;
