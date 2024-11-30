import React, { useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";

const LogoutPage = () => {

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "" });
                if (liff.isLoggedIn()) {
                    const profile = await liff.getProfile();
                    if (profile) {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
                            {
                                lineuserid: profile.userId,
                            },
                            {
                                headers: { "Content-Type": "application/json" },
                            }
                        );
                        liff.logout();
                        window.close(); // Close the page
                    }
                }
            } catch (error) {
                console.error("LIFF Initialization failed", error);
            }
        };
        initializeLiff();
    }, []);

    return (
        <div>
            <h1>Logout</h1>
        </div>
    );
};

export default LogoutPage;
