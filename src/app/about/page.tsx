import {NextPage} from "next";
import Card from "@/app/components/Card";
import React from "react";

const About: NextPage = () => {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                Przemysław Papla
                <Card>Hello</Card>
                <img src="/test.svg" alt="" />
            </div>
        </div>
    )
}

export default About;
