// Header/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import {SettingModal, TaskModal} from '@/components/Modal';
import { Button } from "@/components/ui/button";

interface HeaderProps {
    isRunning: boolean;
}
function Header({isRunning}: HeaderProps){
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const modalOpen = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };
    const modalTaskOpen = () => {
        setIsTaskOpen(!isTaskOpen);
    };
    return (
        <div className={`fixed top-0 left-0 right-0 flex justify-between px-8  ${isRunning ? 'bg-red-500' : 'bg-blue-500'} h-16 items-center drop-shadow-2xl border-b border-gray-300 shadow-md  `}>
            <h1 className="font-bold text-2xl">Tomato</h1>
            <div className="flex gap-3">
                <Button variant="outline" onClick={modalOpen}>設定</Button>
                <SettingModal isOpen={isSettingsOpen} onClose={modalOpen}></SettingModal>
                <Button onClick={modalTaskOpen}>タスク履歴</Button>
                <TaskModal isOpen={isTaskOpen} onClose={modalTaskOpen}></TaskModal>
            </div>
        </div>
    );
};

export default Header;