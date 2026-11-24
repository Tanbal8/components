import { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import PersianDate from 'tanbal-persian-date';
import './date-input.scss';

const DateInput = ({
    initialDate = PersianDate.today(),
    nextDaysLimit = false,
    nextDaysLimitCallback = () => {},
    format = date => date.toString(),
    onChange = () => {},
    backgroundColor = '#Fff',
    buttonBackgroundColor = '#ddd',
    buttonSize = 15,
    ...props
}) => {
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const goToNextDay = () => {
        if (nextDaysLimit && currentDate.isToday()) {
            nextDaysLimitCallback();
            return;
        }
        const newDate = currentDate.nextDay();
        setCurrentDate(newDate);
    }

    const goToPreviousDay = () => {
        const newDate = currentDate.previousDay();
        setCurrentDate(newDate);
    }

    const onkeyDown = (e) => {
        e.preventDefault();

        switch (e.key) {
            case 'ArrowUp':
                goToNextDay();
                break;
            case 'ArrowDown':
                goToPreviousDay(); 
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        onChange(currentDate);
    }, [currentDate]);

    return (
        <div className="date-input">
            <input
                type="text"
                name='date-input'
                value={format(currentDate)}
                readOnly={true}
                onKeyDown={onkeyDown}
                style={{
                    backgroundColor: backgroundColor,
                }}
                { ...props }
            />
            <div className='date-input-buttons'>
                <button
                    type="button"
                    onClick={goToNextDay}
                    style={{
                        backgroundColor: buttonBackgroundColor,
                    }}
                >
                    <FaCaretUp size={buttonSize} />
                </button>
                <button
                    type="button"
                    onClick={goToPreviousDay}
                    style={{
                        backgroundColor: buttonBackgroundColor,

                    }}
                >
                    <FaCaretDown size={buttonSize} />
                </button>
            </div>
        </div>
    );
}

export default DateInput;
