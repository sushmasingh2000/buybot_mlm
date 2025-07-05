import React, { useState } from "react";
import { endpoint } from "../../utils/APIRoutes";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import bit from "../../assets/bit.png"
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import moment from "moment";

const Profile = () => {
    const [loding, setLoding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPsw, setShowPsw] = useState(false);

    const { data: profile } = useQuery(
        ["get_profile"],
        () => apiConnectorGet(endpoint?.profile_api),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );
    const user_profile = profile?.data?.result || 0;

    const initialValues = {
        wallet_address: user_profile?.wallet_Address || "",
    }
    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: () => {
            const reqbody = {
                wallet_address: fk.values.wallet_address,
            };
            WalletFn(reqbody)
        }
    });
    async function WalletFn(reqbody) {
        setLoding(true)
        try {
            const res = await apiConnectorPost(endpoint?.add_wallet_address, reqbody);
            toast(res?.data?.message);
            if (res?.data?.message === "Wallet Add Successfully") {
                showModal(false)
            }
            fk.handleReset();
        } catch (e) {
            console.log(e);
        }
        setLoding(false);
    }
    const initialValuesss = {
        oldPass: "",
        newPass: "",
    }
    const formik = useFormik({
        initialValues: initialValuesss,
        enableReinitialize: true,
        onSubmit: () => {
            const reqbody = {
                oldPass: formik.values.oldPass,
                newPass: formik.values.newPass,
            };
            UpdatePasswordFn(reqbody)
        }
    });
    async function UpdatePasswordFn(reqbody) {
        setLoding(true)
        try {
            const res = await apiConnectorPost(endpoint?.update_user_password, reqbody);
            toast(res?.data?.message);
            if (res?.data?.message === "Password Update Successfully") {
                showPsw(false)
            }
            fk.handleReset();
        } catch (e) {
            console.log(e);
        }
        setLoding(false);
    }

    return (
        <>
            <div className=" bg-gray-900 rounded-xl lg:mt-8 text-gray-100 p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
                        <div className="flex flex-col items-center mb-6">
                            <img src={bit} alt="Coin Icon" className="w-16 h-16 mb-3" />
                            <h2 className="text-lg font-semibold text-white">General Account Information</h2>
                        </div>

                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Registration Date:</span>
                                <span className="text-gray-100">{user_profile?.Joining_Date_1}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Activation Date:</span>
                                <span className="text-gray-100">{user_profile?.TOPDATE ? moment(user_profile?.TOPDATE)?.format("DD-MM-YYYY") : "--"}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Name:</span>
                                <span className="text-gray-100">{user_profile?.Intro_Name || "--"}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Email Id:</span>
                                <span className="text-gray-100">{user_profile?.Email}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Mobile Number:</span>
                                <span className="text-gray-100">{user_profile?.Mobile_No}</span>
                            </div>

                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>ID:</span>
                                <span className="text-gray-100">{user_profile?.Login_Id}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Account Status:</span>
                                <span className="text-green-400 font-medium">{user_profile?.or_m_status === 1 ? "Active" : " DeActive"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 h-fit p-3 rounded-lg shadow-lg">
                        <div className="flex flex-col items-center mb-6">
                            <img src={bit} alt="Coin Icon" className="w-16 h-16 mb-3" />
                            <h2 className="text-lg font-semibold text-white">Password & Crypto Address</h2>
                            <p className="text-gray-400 text-sm">Manage account settings securely</p>
                        </div>

                        {["Update Profile", "Update Password", "Update Wallet Address"].map((label, index) => (
                            <div key={index} className={`flex justify-between items-center py-2 ${index < 3 ? "border-b border-gray-700" : ""}`}>
                                <span className="text-gray-300">{label}:</span>
                                <button
                                    className="bg-gold-color hover:bg-green-600 text-gray-900 font-semibold py-1.5 px-4 rounded text-xs"
                                    onClick={() => {
                                        if (label === "Update Wallet Address") setShowModal(true);
                                        else if (label === "Update Password") setShowPsw(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-white text-lg font-semibold mb-4">
                            {fk.values.wallet_address ? "Update Wallet Address" : "Add Wallet Address"}
                        </h3>
                        <form onSubmit={fk.handleSubmit}>
                            <input
                                type="text"
                                name="wallet_address"
                                placeholder="Enter wallet address"
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={fk.values.wallet_address}
                                onChange={fk.handleChange}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                    onClick={() => {
                                        setShowModal(false);
                                        fk.handleReset();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600"
                                    disabled={loding}
                                >
                                    {loding ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showPsw && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-white text-lg font-semibold mb-4">
                          Change Password
                        </h3>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="text"
                                name="oldPass"
                                id="oldPass"
                                placeholder="Enter Old Password"
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formik.values.oldPass}
                                onChange={formik.handleChange}
                            />
                            <input
                                type="text"
                                name="newPass"
                                id="newPass"
                                placeholder="Enter New Password"
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={formik.values.newPass}
                                onChange={formik.handleChange}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                    onClick={() => {
                                        setShowPsw(false);
                                        formik.handleReset();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600"
                                    disabled={loding}
                                >
                                    {loding ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>

    );
};

export default Profile;

