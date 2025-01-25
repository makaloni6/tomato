import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function SettingModal({isOpen, onClose}: ModalProps){
    if (!isOpen) return null;

    return (
        <>
            <div className='overlay'></div>
            <div className="modal">
                <button onClick={onClose} className="modal-close" type="button">×</button>
                {/* セッティング内容をここに記述 */}
                <h2>時間設定</h2>
                <div>
                    <label>時間設定</label>
                </div>
                <div>
                    <label>自動で休憩に入るか</label>
                </div>
                <h2>Theme</h2>
                <div>
                    <label>バックグラウンド</label>
                    <label>色</label>
                    <label>動き</label>
                </div>
            </div>
        </>
    );
}

function TaskModal({ isOpen, onClose}: ModalProps){
    if (!isOpen) return null;

    return (
        
        <div className="modal">
            <button onClick={onClose} className="modal-close" type="button">
				×
			</button>
            <h2>タスク処理履歴</h2>
            {/* タスク履歴の内容をここに記述 */}
            <button onClick={onClose}>閉じる</button>
        </div>
    );
};

export {SettingModal, TaskModal};