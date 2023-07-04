"use client"

import React from 'react'
import {useTheme} from "next-themes";
import {Switch} from '@headlessui/react';

const Button = () => {
    const {resolvedTheme, setTheme} = useTheme();
    const lightTheme = resolvedTheme === "light";

    const toggleTheme = () => {
        lightTheme ? setTheme("dark") : setTheme("light");
    }

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
