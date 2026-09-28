import { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import './dialog.scss';

class dialog {
    #setDialog = null;
    #resolve = null;

    setState(setDialog) {
        this.#setDialog = setDialog;
    }

    open({
        title = '',
        messages = [],
        options = [
            { title: 'OK', value: true, },
            { title: 'Cancel', value: false, },
        ],
    } = {}) {
        return new Promise(resolve => {
            this.#resolve = resolve;

            this.#setDialog({
                title,
                messages,
                options,
            });
        });
    }

    resolve(value) {
        this.#resolve?.(value);
        this.#resolve = null;
        this.#setDialog(null);
    }
}

const dialogInstance = new dialog();

const Dialog = () => {
    const [dialogData, setDialogData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        dialogInstance.setState(setDialogData);
    }, []);

    useEffect(() => {
        if (!dialogData) return;

        setIsClosing(false);

        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, [dialogData]);

    if (!dialogData) return null;

    const {
        title = '',
        messages = [],
        options = [
            { title: 'OK', value: true },
            { title: 'Cancel', value: false },
        ],
    } = dialogData;

    const closeHandler = value => {
        setIsClosing(true);
        setIsVisible(false);

        setTimeout(() => {
            dialogInstance.resolve(value);
        }, 200);
    };

    const getButtonColor = (option, index) => {
    if (option.color) return option.color;
        if (options.length === 1) return '#2563eb';
        if (index === 0) return '#2563eb';
        if (index === options.length - 1) return '#dc2626';
        return '#6b7280';
    };

    return (
        <div className='dialog-overlay'>
            <div className={`dialog ${isVisible && !isClosing ? 'visible' : ''}`}>
                <button
                    className='dialog-close'
                    onClick={() => closeHandler(null)}
                >
                    <FaXmark />
                </button>

                <div className='dialog-messages'>
                    <div className='dialog-title'>{title}</div>

                    { messages.map((message, index) => (
                        <div key={`message-${index}`}>{message}</div>
                    )) }
                </div>

                <div className='dialog-buttons'>
                    { options.map((option, index) => (
                        <button
                            key={option.value || index}
                            onClick={() => closeHandler(option.value !== undefined ? option.value : null)}
                            style={{
                                backgroundColor: getButtonColor(option, index),
                            }}
                        >
                            { option.title }
                        </button>
                    )) }
                </div>
            </div>
        </div>
    );
}

export default Dialog;
export {
    dialogInstance as dialog,
};