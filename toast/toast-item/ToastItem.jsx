import { useCallback, useEffect, useState } from 'react';
import './toast-item.scss';

const ToastItem = ({ toastData, removeToast }) => {
    const { id, title, message, icon, color } = toastData;
    const [isShowing, setIsShowing] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const removeToastHandler = useCallback(() => {
        setIsShowing(false);
        setIsRemoving(true);

        setTimeout(() => removeToast(id), 200);
    }, [id, removeToast]);

    useEffect(() => {
        setIsShowing(true);
        const removeTimeout = setTimeout(removeToastHandler, 5000);

        return () => {
            clearTimeout(removeTimeout);
        };
    // eslint-disable-next-line
    }, []);

    return (
        <div
            className={`toast ${isShowing ? 'showing' : ''} ${isRemoving ? 'removing' : ''}`}
            style={{ color: color }}
            onClick={removeToastHandler}
        >
            <div className='toast-status-icon'>
                {icon}
            </div>

            <div className='toast-content'>
                <div className='toast-title'>
                    {title}
                </div>
                { message &&
                    <div className='toast-message' dir='auto'>
                        {message}
                    </div>
                }
            </div>
        </div>
    );
}

export default ToastItem;