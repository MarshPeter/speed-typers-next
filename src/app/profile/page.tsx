"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Analytics from "@/components/Analytics";
import UserDetails from "@/components/UserDetails";
import WordData from "@/models/WordData";
import getWordsPerMinuteOverTime from "@/services/dataFetcher";

enum PageType {
    DETAILS,
    ANALYTICS,
}

export default function Profile() {
    const [data, setData] = useState([{}]);
    const [dataRetrieved, setDataRetrieved] = useState(false);
    const [showComponent, setShowComponent] = useState(PageType.ANALYTICS);
    const router = useRouter();

    useEffect(() => {
        const userLoggedIn = localStorage.getItem("username");
        if (!userLoggedIn) {
            router.push("/");
        }

        setData(getWordsPerMinuteOverTime());
        setDataRetrieved(true);
    }, []);

    function showAnalytics() {
        setShowComponent(PageType.ANALYTICS);
    }

    function showDetails() {
        setShowComponent(PageType.DETAILS);
    }

    if (!dataRetrieved) {
        return <div>loading</div>;
    }

    return (
        <div>
            <main className="flex justify-center gap-8">
                <div className="flex flex-wrap flex-col gap-8 justify-center bg-indigo-100/40 content-center min-h-96 rounded-2xl border-8 border-black p-8 text-2xl">
                    <Button
                        prompt={"Profile Details"}
                        onPressFunction={showDetails}
                    ></Button>
                    <Button
                        prompt={"Analytics"}
                        onPressFunction={showAnalytics}
                    ></Button>
                </div>
                <div className="flex flex-wrap gap-8 justify-center bg-indigo-100/40 content-center min-h-96 min-w-96 rounded-2xl border-8 border-black p-8 text-2xl">
                    {showComponent === PageType.ANALYTICS ? (
                        <Analytics data={data as WordData[]}></Analytics>
                    ) : (
                        <UserDetails></UserDetails>
                    )}
                </div>
            </main>
        </div>
    );
}
