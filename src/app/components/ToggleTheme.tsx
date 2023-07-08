"use client"

import React from 'react'
import {useTheme} from "next-themes";
import {Switch} from '@headlessui/react';
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline';
import IconButton from "@/app/components/IconButton";

const Button = () => {
    const {resolvedTheme, setTheme} = useTheme();
    const lightTheme = resolvedTheme === "light";

    const toggleTheme = () => {
        lightTheme ? setTheme("dark") : setTheme("light");
    }

    return (
        <IconButton Icon={lightTheme ? SunIcon : MoonIcon} onClick={toggleTheme} />
    )

    return (
        <button
            onClick={toggleTheme}
            className="middle none center rounded-full p-2  hover:bg-gray-2'00 dark:hover:bg-slate-600"
        >
            {lightTheme ? <SunIcon className="h-6 w-6 text-black" /> : <MoonIcon className="h-6 w-6 text-white" />}
        </button>
    );

    return (
        <Switch
            checked={lightTheme}
            onChange={toggleTheme}
            className={`${
                lightTheme ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span
                className={`${
                    lightTheme ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

export default Button
