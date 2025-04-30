import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import mediaUpload from "../utils/mediaUpload";
import "../css/home.css";

export function Profile() {
    const [user, setUser] = useState(null);
    const fileInputRef = useRef();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        image: "",
    });
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setFormData({
                email: parsed.email,
                username: parsed.username,
                image: parsed.image,
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePasswordChange = (e) => {
        setPasswords((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/update/${user.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire("Success", "Profile updated successfully!", "success");
            localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
            setUser({ ...user, ...formData });
        } catch (err) {
            console.error("Update failed", err);
            Swal.fire("Error", "Failed to update profile.", "error");
        }
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Your account will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                localStorage.clear();
                Swal.fire("Deleted", "Your account has been deleted.", "success");
                window.location.href = "/";
            } catch (err) {
                console.error("Delete failed", err);
                Swal.fire("Error", "Failed to delete account.", "error");
            }
        }
    };

    const handleChangePassword = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/update/password/${user.id}`,
                passwords,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire("Success", res.data.message, "success");
            setPasswords({ oldPassword: "", newPassword: "" });
        } catch (err) {
            const message = err.response?.data?.message || "Failed to change password.";
            Swal.fire("Error", message, "error");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const uploadedUrl = await mediaUpload(file);
            setFormData((prev) => ({
                ...prev,
                image: uploadedUrl,
            }));
            Swal.fire("Uploaded!", "Image uploaded successfully.", "success");
        } catch (err) {
            console.error("Image upload failed", err);
            Swal.fire("Error", "Image upload failed.", "error");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        Swal.fire("Logged Out", "You have been logged out.", "success");
        window.location.href = "/login";
    };

    if (!user) return <div className="p-6">Loading profile...</div>;

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 max-w-2xl mx-auto mt-20">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <div onClick={() => fileInputRef.current.click()} className="cursor-pointer">
                        <img
                            src={formData.image || "https://via.placeholder.com/150?text=Upload+Image"}
                            alt="Profile"
                            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white shadow-lg hover:opacity-90 transition"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <h2 className="text-xl sm:text-2xl font-semibold">Your Profile</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg mt-6">
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="mt-1 block w-full p-3 bg-gray-100 border rounded-md cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
                        >
                            Delete Account
                        </button>
                    </div>

                    {/* Password Change */}
                    <div className="mt-10 border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handlePasswordChange}
                            className="mb-3 w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
                            placeholder="Old Password"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="mb-3 w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-500"
                            placeholder="New Password"
                        />
                        <button
                            onClick={handleChangePassword}
                            className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
