import { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import './date-input.scss';
import PersianDate from 'tanbal-persian-date';

const DateInput = ({
    initialDate = PersianDate.today(),
    nextDaysLimit = false,
    nextDaysLimitCallback = () => {},
    format = date => date.toString(),
    onChange = () => {},
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

    console.log(currentDate);

    return (
        <div className="date-input">
            <input
                type="text"
                value={format(currentDate)}
                readOnly={true}
                onKeyDown={onkeyDown}
            />
            <div className='date-input-buttons'>
                <button
                    type="button"
                    onClick={goToNextDay}
                >
                    <FaCaretUp />
                </button>
                <button
                    type="button"
                    onClick={goToPreviousDay}
                >
                    <FaCaretDown />
                </button>
            </div>
        </div>
    );
}

export default DateInput;
