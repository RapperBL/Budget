import React, { useEffect, useState } from 'react';
import axios from 'axios'; // assuming you're using axios for API calls
import Navbar from '../components/nav/Nav';
import { DisplayUser, updateUserProfile, changeUserPassword } from '../Service';
import Swal from 'sweetalert2';

const Setting = () => {
    const [userData, setUserData] = useState({
        Login_User: '',
        LoginFullName: '',
        LoginStatus: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Modal for changing password
    const [newUsername, setNewUsername] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [oldPassword, setOldPassword] = useState(''); // State for old password
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming new password

    const loggedInUsername = localStorage.getItem('Login_User');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await DisplayUser();
                const user = data.find(user => user.Login_User === loggedInUsername);
                if (user) {
                    setUserData(user);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getUserData();
    }, [loggedInUsername]);

    const handleEditUserDetails = async () => {
        try {
            const { Login_No } = userData;
            await updateUserProfile(Login_No, newUsername, newFullName);

            setUserData(prevData => ({
                ...prevData, 
                Login_User: newUsername,
                LoginFullName: newFullName
            }));

            localStorage.setItem('Login_User', newUsername);

            Swal.fire('Success', 'User details updated successfully', 'success');
            setIsModalOpen(false); // Close the modal after updating
        } catch (error) {
            console.error('Failed to update user details:', error);
            Swal.fire('Error', `Failed to update user details: ${error.message}`, 'error');
        }
    };

    // Function to handle password change
    const handleChangePassword = async () => {
        // Check if the new password fields are empty
        if (!newPassword || !confirmPassword) {
            Swal.fire('Error', 'Please Input New password & Comfirm password', 'error');
            return;
        }
    
        // Check if the new password and confirm password do not match
        if (newPassword !== confirmPassword) {
            Swal.fire('Error', 'New password and confirm password do not match', 'error');
            return;
        }
    
        try {
            const { Login_No } = userData;
            await changeUserPassword(Login_No, oldPassword, newPassword, confirmPassword);
    
            Swal.fire('Success', 'Password changed successfully', 'success');
            setIsPasswordModalOpen(false); 
    
            // Clear input fields after successful change
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Failed to change password:', error);
            Swal.fire('Error', 'Incorrect old password', 'error');
        }
    };
    

    // Function to open the modal and initialize the inputs with the current user details
    const openModal = () => {
        setNewUsername(userData.Login_User); // Set the current username as the default value
        setNewFullName(userData.LoginFullName); // Set the current full name as the default value
        setIsModalOpen(true); // Open the modal
    };

    // Function to open the change password modal
    const openPasswordModal = () => {
        setIsPasswordModalOpen(true); // Open the change password modal
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-10 shadow-lg rounded-lg w-full max-w-4xl">
                    <h1 className="text-4xl font-bold">Manage User</h1>

                    <div className="mt-10 bg-gray-100 p-5 border rounded-lg">
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-400 text-white py-1 px-2 rounded font-bold">ຊື່ຜູ້ໃຊ້:</span>
                                <span>{userData.Login_User}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-400 text-white py-1 px-2 rounded font-bold">ຊື່ແທນສະກຸນ:</span>
                                <span>{userData.LoginFullName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-400 text-white py-1 px-2 rounded font-bold">ສະຖານະ:</span>
                                <span>{userData.LoginStatus}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                            onClick={openModal} // Open the modal and set the old username and full name
                        >
                            Edit Username & Full Name
                        </button>
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={openPasswordModal} // Open the modal to change password
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for editing username and full name */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Edit Username & Full Name</h2>
                        
                        {/* Username Input */}
                        <input
                            type="text"
                            className="border p-2 w-full mb-4"
                            placeholder="Enter new username"
                            value={newUsername} // Display the current username as the initial value
                            onChange={(e) => setNewUsername(e.target.value)} // Update the input state
                        />

                        {/* Full Name Input */}
                        <input
                            type="text"
                            className="border p-2 w-full mb-4"
                            placeholder="Enter new full name"
                            value={newFullName} // Display the current full name as the initial value
                            onChange={(e) => setNewFullName(e.target.value)} // Update the input state
                        />

                        <div className="flex justify-end space-x-4">
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setIsModalOpen(false)} // Close modal on cancel
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleEditUserDetails} // Handle username and full name update
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for changing password */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                        
                        {/* Old Password Input */}
                        <input
                            type="password"
                            className="border p-2 w-full mb-4"
                            placeholder="Enter old password"
                            value={oldPassword} // Display the old password input
                            onChange={(e) => setOldPassword(e.target.value)} // Update the old password state
                        />

                        {/* New Password Input */}
                        <input
                            type="password"
                            className="border p-2 w-full mb-4"
                            placeholder="Enter new password"
                            value={newPassword} // Display the new password input
                            onChange={(e) => setNewPassword(e.target.value)} // Update the new password state
                        />

                        {/* Confirm New Password Input */}
                        <input
                            type="password"
                            className="border p-2 w-full mb-4"
                            placeholder="Confirm new password"
                            value={confirmPassword} // Display the confirm password input
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update the confirm password state
                        />

                        <div className="flex justify-end space-x-4">
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setIsPasswordModalOpen(false)} // Close modal on cancel
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleChangePassword} // Handle password update
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Setting;
