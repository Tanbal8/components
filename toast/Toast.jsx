import { useEffect, useState } from 'react';
import ToastItem from './toast-item/ToastItem';
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { IoWarningSharp } from "react-icons/io5";
import { TbMessageCircleFilled } from "react-icons/tb";
import './toast.scss';

class toast {
    #toastsBeforeRender = [];
    #addToasts = null;

    setState(setToasts = () => {}) {
        const addToast = (type, title, message, icon, color) => {
            setToasts(current => {
                const id = current.length > 0
                    ? Math.max(...current.map(toast => toast.id)) + 1
                    : 1;

                return [
                    ...current,
                    {
                        id,
                        type,
                        title,
                        message,
                        icon,
                        color,
                    }
                ];
            });
        };

        this.#addToasts = addToast;

        this.#handleBeforeRender();
    }

    #handleBeforeRender() {
        if (this.#toastsBeforeRender.length > 0) {
            this.#toastsBeforeRender.forEach(toast => {
                this.#addToasts(
                    toast.type,
                    toast.title,
                    toast.message,
                    toast.icon
                );
            });

            this.#toastsBeforeRender = [];
        }
    }

    #createToast({ type, title, message, icon, color }) {
        const newToast = {
            type,
            title,
            message,
            icon,
            color,
        };

        if (this.#addToasts) {
            this.#addToasts(
                newToast.type,
                newToast.title,
                newToast.message,
                newToast.icon,
                newToast.color,
            );
        }
        else {
            this.#toastsBeforeRender.push(newToast);
        }
    }

    success(title, message) {
        this.#createToast({
            type: 'success',
            title: title,
            message: message,
            icon: <FaCheckCircle />,
            color: 'green'
        });
    }

    error(title, message) {
        this.#createToast({
            type: 'error',
            title: title,
            message: message,
            icon: <FaTimesCircle />,
            color: 'red'
        });
    }

    warn(title, message) {
        this.#createToast({
            type: 'warn',
            title: title,
            message: message,
            icon: <IoWarningSharp />,
            color: 'orange'
        });
    }
    
    info(title, message) {
        this.#createToast({
            type: 'info',
            title: title,
            message: message,
            icon: <TbMessageCircleFilled />,
            color: 'yellow'
        });
    }
}

let toastInstance = new toast();

const Toast = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        toastInstance.setState(setToasts);
    }, []);

    const removeToast = (id) => {
        setToasts(current => current.filter(toast => toast.id !== id));
    };

    return (
        <div id='toast-container'>
            {toasts.map(toast => (
                <ToastItem toastData={toast} removeToast={removeToast} key={toast.id} />
            ))}
        </div>
    );
}

export default Toast;
export {
    toastInstance as toast,
}