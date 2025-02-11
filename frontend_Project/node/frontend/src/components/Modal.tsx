import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;

    timer: number;
    setTimer: (timer: number) => void;

    restTimer: number;
    setRestTimer: (restTimer: number) => void;
}

function SettingModal({isOpen, onClose, timer, setTimer, restTimer, setRestTimer}: ModalProps){
    if (!isOpen) return null;

    const [work_color, setWorkColor] = useState('');
    const [rest_color, setRestColor] = useState('');

    const timerSetting = {
        work_time: timer,
        rest_time: restTimer,
        user_id: "1",
    }
    const appSetting = {
        work_color: work_color,
        rest_color: rest_color
    }

    const settingSubmit = () => {
        console.log(timer, restTimer);
        console.log(work_color, rest_color);
        axios.post('http://localhost:8080/update_timer/', {
            timer: timerSetting,
            app: appSetting
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <div className='overlay'></div>
            <div className="modal">
                <button onClick={onClose} className="modal-close" type="button">×</button>
                {/* セッティング内容をここに記述 */}
                <h2 className='setting-content text-2xl font-bold border-b-4 border-gray-300 '>Timer</h2>
            
                <div className="flex items-center gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <label className="w-16 font-bold">Working</label>
                        <input 
                            type="number" 
                            min="0" 
                            max="60"
                            defaultValue={timer / 60}
                            onChange={e => setTimer(Number(e.target.value) * 60)}
                            className="w-20 px-2 py-1 border rounded bg-gray-100 text-black" 
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="w-16 font-bold">Rest</label>
                        <input 
                            type="number" 
                            min="0" 
                            max="60"
                            defaultValue={restTimer/ 60}
                            onChange={e => setRestTimer(Number(e.target.value) * 60)}
                            className="w-20 px-2 py-1 border rounded bg-gray-100 text-black" 
                        />
                    </div>
                </div>
 
                <h2 className='setting-content text-2xl font-bold border-b-4 border-gray-300'>Theme</h2>
                <ul>
                    <label>Color</label>
                    <Select>

                        <SelectTrigger>
                            <SelectValue placeholder="Select Color theme" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem className='text-align' value="light">light theme</SelectItem>
                            <SelectItem className='text-center' value="dark">dark theme</SelectItem>
                            <SelectItem className='text-center' value="japanese">japanese theme</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className='flex items-center gap-2'>
                        <label className="w-16 font-bold">Working</label>
                        <input 
                            className="w-20 px-2 py-1 border rounded bg-gray-100 text-black" 
                            type="color"
                            onChange={e => setWorkColor(e.target.value)}
                        ></input>
                        <label className="w-16 font-bold">Rest</label>
                        <input 
                            className="w-20 px-2 py-1 border rounded bg-gray-100 text-black" 
                            type="color"
                            onChange={e => setRestColor(e.target.value)}
                        ></input>
                    </div>
                    <label>動き</label>
                </ul>
                <div className='flex px-4 py-0 justify-end'>
                    <button onClick={settingSubmit} className='rounded-full bg-gray-300 px-4 py-2 '>submit</button>
                </div>
            </div>
        </>
    );
}

function TaskModal({ isOpen, onClose}: ModalProps){
    if (!isOpen) return null;

    const [date, setDate] = useState([]);
    const [work_total, setWorkTotal] = useState([]);
    const [task_total, setTaskTotal] = useState([]);
    const [user_id, setUserId] = useState([]);

    
    useEffect(() => {
        axios.get(`http://localhost:8080/history/1`)
        .then(response => {
            setDate(response.data.date);
            setWorkTotal(response.data.work_total);
            setTaskTotal(response.data.task_total);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, []);

    return (
        <>
            <div className='overlay'></div>
            <div className="modal">
                <button onClick={onClose} className="modal-close" type="button">
                    ×
                </button>
                <h2>タスク処理履歴</h2>
                <ul>
                    <li>
                        <label>日付</label>
                        {date}
                    </li>
                    <li>
                        <label>作業時間</label>
                        {work_total}
                    </li>
                    <li>
                        <label>タスク数</label>
                        {task_total}
                    </li>
                </ul>
            </div>
        </>
    );
};

export {SettingModal, TaskModal};