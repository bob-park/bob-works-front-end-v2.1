'use client';

import { useEffect, useState } from 'react';

type TimePickerProps = {
  time: string;
  onChange?: (time: string) => void;
};

export default function TimePicker({ time, onChange }: TimePickerProps) {
  // state
  const [hour, setHour] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');

  // useEffect
  useEffect(() => {
    setHour(time.substring(0, 2));
    setMinutes(time.substring(3, 5));
  }, [time]);

  useEffect(() => {
    handleChange();
  }, [hour, minutes]);

  const handleChange = () => {
    onChange && onChange(`${hour}:${minutes}`);
  };

  return (
    <div className="w-full rounded-lg bg-white px-5 py-2 shadow-xl">
      <div className="flex justify-center">
        <select
          name="hours"
          className="text-md mr-3 appearance-none bg-transparent outline-none"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        >
          {Array(24)
            .fill('')
            .map((item, i) => (
              <option key={`timepicker_hour_${i}`} value={`${i}`.padStart(2, '0')}>
                {`${i}`.padStart(2, '0')}
              </option>
            ))}
        </select>
        <span className="text-md mr-3">:</span>
        <select
          name="minutes"
          className="text-md appearance-none bg-transparent outline-none"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        >
          <option value="00">00</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
}
