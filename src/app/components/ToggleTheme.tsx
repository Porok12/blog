"use client"

import React, {useEffect, useState} from 'react'
import {useTheme} from "next-themes";
import {Switch} from '@headlessui/react';

const Button = () => {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const toggle = () => theme == "dark" ? setTheme('light') : setTheme("dark");
    const [enabled, setEnabled] = useState(currentTheme == 'dark');

    useEffect(() => {
        toggle();
    }, [enabled]);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

export default Button
