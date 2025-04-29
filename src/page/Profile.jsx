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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
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
                `${import.meta.env.VITE_BACKEND_URL}/api/users/update/password/${
                    user.id
                }`,
                passwords,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Swal.fire("Success", res.data.message, "success");
            setPasswords({ oldPassword: "", newPassword: "" });
        } catch (err) {
            console.error("Password change failed", err);
            const message =
                err.response?.data?.message || "Failed to change password.";
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
        <div className="max-w-xl mx-auto p-8 bg-gradient-to-r   rounded-xl shadow-xl mt-10 backdrop-blur-md">
            <div className="flex flex-col items-center mb-6">
                <div
                    onClick={() => fileInputRef.current.click()}
                    className="cursor-pointer mb-4"
                >
                    <img
                        src={
                            formData.image ||
                            "https://via.placeholder.com/150?text=Upload+Image"
                        }
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg hover:opacity-90 transition-all duration-300"
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                />
                <h2 className="text-3xl font-semibold text-white text-center mb-4">
                    Your Profile
                </h2>
                <button
                    onClick={handleLogout}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-all duration-200"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                    <label>UserName</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border p-3 rounded-md shadow-sm focus:outline-none w-md focus:ring-2 focus:ring-blue-500"
                        placeholder="First Name"
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="border p-3 rounded-md bg-gray-100  w-md cursor-not-allowed"
                    />
                    

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleUpdate}
                            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                        >
                            Delete Account
                        </button>
                    </div>

                    {/* Change Password Section */}
                    <div className="mt-10 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Change Password
                        </h3>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handlePasswordChange}
                            className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-5"
                            placeholder="Old Password"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-5"
                            placeholder="New Password"
                        />
                        <button
                            onClick={handleChangePassword}
                            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200 mt-4"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
