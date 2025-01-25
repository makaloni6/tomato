import React, { useState, useEffect, useRef } from 'react';
import {SettingModal, TaskModal} from '@/components/Modal';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import {TimerDisplay} from '@/components/TimerDisplay';
import {TimerHeader} from '@/components/TimerDisplay';

interface TimerProps {
    isRunning: boolean; // isRunningを受け取る
    setIsRunning: (isRunning: boolean) => void; // setIsRunningも受け取る
  }

// function Timer(isRunning: boolean, setIsRunning: (isRunning: boolean) => void){
function Timer({isRunning, setIsRunning}: TimerProps){
    const test_time = 5
    const test_rest_time = 3
    const today = new Date();
    const [timer, setTimer] = useState(test_time);
    const [restTimer, setRestTimer] = useState(test_rest_time);
    const [user, setUser] = useState('test_user');
    const [data, setData] = useState('');
    const [isRest, setIsRest] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const modalOpen = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };
    const modalTaskOpen = () => {
        setIsTaskOpen(!isTaskOpen);
    };

    const start = ()=>{
        setIsRunning(true);
    }
    const stop = ()=>{
        setIsRunning(false);
        setIsRest(false);
    }
    const reset = ()=>{
        setIsRunning(false)
        setIsRest(false)
        setTimer(5)
        setRestTimer(7)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const formattedDate = today.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    .split("/")
    .join("-");
    useEffect(() => {
        axios.get('http://localhost:8080/timer')
        .then(response => {
            setTimer(response.data.time);
            setUser(response.data.user);
            setIsRunning(response.data.isRunning);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, []);

    useEffect(() => {
        if (isRunning == false){
            return
        }
        
        const interval = setInterval(() => {
            setTimer(timer - 1)
        }, 1000)
        
        if (timer == 0){
            setIsRunning(false);
            setIsRest(true);
            clearInterval(interval);

        }
        
        return () => clearInterval(interval);

    }, [isRunning, timer])

    useEffect(() => {

        if (isRest == false){
            return
        }
        const interval = setInterval(() => {
            setRestTimer(restTimer - 1)
        }, 1000)
        if (restTimer == 0){
            setIsRest(false);
            setIsRunning(true);
            clearInterval(interval);
            reset();
        }
        return () => clearInterval(interval);
    }, [isRest, restTimer])

   
    return (
        <div className={`timer-base ${isRunning ? 'bg-red-500' : 'bg-blue-500'}`}>
            <div id="date" className='relative top-0 left-0'>{formattedDate}</div>
            <button onClick={modalOpen}>セッティング</button>
            <SettingModal isOpen={isSettingsOpen} onClose={modalOpen}></SettingModal>
            <button onClick={modalTaskOpen}>タスク履歴</button>
            <TaskModal isOpen={isTaskOpen} onClose={modalTaskOpen}></TaskModal>
            <h2>ポモドーロタイマー</h2>

            <p>仕事中{isRunning ? 'True' : 'False'}</p>
            <p>休憩中{isRest ? 'True' : 'False'}</p>
            {isRunning ? <p>仕事中タイマー：{formatTime(timer)}</p> : <p>休憩中タイマー：{formatTime(restTimer)}</p>}
            <Button onClick={start}>開始</Button>
            <Button onClick={stop}>停止</Button>
            <Button onClick={reset}>リセット</Button>

        </div>
    );
}

export default Timer;