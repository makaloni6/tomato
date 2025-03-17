// Header/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import {SettingModal, TaskModal} from '@/components/Modal';
import { Button } from "@/components/ui/button";

interface HeaderProps {
    isRunning: boolean;
    timer: number;
    setTimer: (timer: number) => void;
    restTimer: number;
    setRestTimer: (restTimer: number) => void;
}
function Header({isRunning, timer, setTimer, restTimer, setRestTimer}: HeaderProps){
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const modalOpen = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };
    const modalTaskOpen = () => {
        setIsTaskOpen(!isTaskOpen);
    };
    return (
        <div className={`header-base top-0 left-0 right-0 flex justify-between px-8  ${isRunning ? 'working' : 'resting'} h-16 items-center drop-shadow-2xl border-b border-gray-300 shadow-md  `}>
            <h1 className="font-bold text-2xl">Tomato</h1>
            <div className="flex gap-3">
                <Button className='header-button' variant="outline" onClick={modalOpen}>Setting</Button>
                <SettingModal isOpen={isSettingsOpen} onClose={modalOpen} timer={timer} setTimer={setTimer} restTimer={restTimer} setRestTimer={setRestTimer}></SettingModal>
                {/* <Button onClick={modalTaskOpen}>タスク履歴</Button>
                <TaskModal isOpen={isTaskOpen} onClose={modalTaskOpen}></TaskModal> */}
            </div>
        </div>
    );
};

export default Header;