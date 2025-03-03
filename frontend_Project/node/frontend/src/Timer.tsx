import { Play, Pause, RotateCcw, Check } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import {SettingModal, TaskModal} from '@/components/Modal';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import {TimerDisplay} from '@/components/TimerDisplay';
import {TimerHeader} from '@/components/TimerDisplay';

interface TimerProps {
    timer: number;
    setTimer: (timer: number) => void;

    restTimer: number;
    setRestTimer: (restTimer: number) => void;

    isRunning: boolean; // isRunningを受け取る
    setIsRunning: (isRunning: boolean) => void; // setIsRunningも受け取る
  }

interface TasklistProps {
    name: string;
    spendTime: string;
}

// function Timer(isRunning: boolean, setIsRunning: (isRunning: boolean) => void){
function Timer({timer, setTimer, restTimer, setRestTimer, isRunning, setIsRunning}: TimerProps){

    const today = new Date();
    const [user, setUser] = useState('test_user');
    const [data, setData] = useState('');
    const [isRest, setIsRest] = useState(false);
    const [taskName, setTaskName] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);
    const [tasklist, setTasklist] = useState<TasklistProps[]>([]);
  
    const [workTime, setWorkTime] = useState(0);
    const [restTime, setRestTime] = useState(0);

    let user_id = '1'
    

    const start = ()=>{
        
        axios.get(`http://localhost:8080/timer/1`)
        .then(response => {
            setTimer(response.data.work_time);
            setRestTimer(response.data.rest_time);
            setUser(response.data.user);
            setWorkTime(response.data.work_time);
            setRestTime(response.data.rest_time);
            console.log(workTime);
        })
        setIsRunning(true);
    }
    const stop = ()=>{
        setIsRunning(false);
        setIsRest(false);
    }
    const reset = ()=>{
        setIsRunning(false);
        setIsRest(false);
        axios.get(`http://localhost:8080/timer/1`)
        .then(response => {
            setTimer(response.data.work_time);
            setRestTimer(response.data.rest_time);
            setUser(response.data.user);
            setIsRunning(response.data.isRunning);
        })
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

    const finishTask = () => {
        console.log(workTime);
        const spendTime = formatTime(workTime - timer);
        setIsRunning(false);
        setIsRest(true);
        
        tasklist.push({name: taskName, spendTime: spendTime});
    }

    const taskmapping = () => {
        
        
        return tasklist.map((task, index) => (
            <p key={index} className='finished-task-title'>{task.name.length > 20 ? task.name.slice(0, 20) : task.name} {task.spendTime}</p>
        ));
    }

    // 初期値設定
    useEffect(() => {
        axios.get('http://localhost:8080/timer/1')
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

    useEffect(() => {
        setTaskName(taskName);
    }, [taskName]);


    return (
        <div className={`timer-base ${isRunning ? 'working' : 'resting'}`}>
            <div className='timer-section'>

                <div id="date" className='relative text-3xl top-0 left-0 text-white-500'>{formattedDate}</div>
                

                {isRunning ? (
                    <div className="timer-counter text-9xl font-bold tracking-wider mb-4 min-w-100">
                        {formatTime(timer)}
                        <div className="text-white-500 text-2xl">
                            Keep up the good work! 
                        </div>
                    </div>
                ) : (
                <div className="timer-counter text-9xl font-bold tracking-wider mb-4 min-w-100 color">
                        {formatTime(restTimer)}
                        <div className="text-white-500 text-2xl">
                            You did it!
                        </div>
                    </div>
                )}
                branch is backup
                <div className='task-section mb-4'>
                    <input 
                        type="text" 
                        className='task-title' 
                        placeholder='Your task' 
                        color='#413535' 
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>

                <div className='button-section'>
                    <Button onClick={start} size="icon">
                        <Play className="h-4 w-4" />
                    </Button>
                    <Button onClick={stop} size="icon">
                        <Pause className="h-4 w-4" />
                    </Button>
                    <Button onClick={reset} size="icon">
                        <RotateCcw className="h-4 w-4" />
                        </Button>
                </div>
                <button className='task-finished-button' onClick={finishTask}>
                    強制完了ボタン
                </button>
            </div>
            <div className='finished-task-section'>

                {taskmapping()}
            </div>


        </div>
    );
}

export default Timer;