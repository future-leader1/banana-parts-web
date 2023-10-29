import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  getHours,
  getMinutes,
  isAfter,
  isSameDay,
  isSameMonth,
  isSaturday,
  isSunday,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { map } from 'lodash';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../Icon';
import { AnimationLayout } from './AnimationLayout';

const NUM_OF_SLIDES = 3;
const SLIDE_MID_INDEX = 1;

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date;
  setSelectedDate: (date: Date) => void;
}

const DatePickerModal = (props: DatePickerModalProps) => {
  const { selectedDate, open, onClose, setSelectedDate } = props;

  const getInitDate = selectedDate ? selectedDate : new Date();
  const [initHour, initMinute] = [
    getHours(getInitDate),
    getMinutes(getInitDate),
  ];
  const changeBufferDates = (date: Date) => {
    const newDates = getBufferDates(date);
    setBufferDates(newDates);
  };
  const getBufferDates = (date: Date) =>
    new Array(NUM_OF_SLIDES)
      .fill(null)
      .map((_, i) => addMonths(date, i - SLIDE_MID_INDEX));
  const [bufferDates, setBufferDates] = useState<Date[]>(
    getBufferDates(getInitDate)
  );

  const startMonth = startOfMonth(bufferDates[1]);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
  const endDate = addDays(startDate, 6 * 7 - 1);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="w-full max-w-[350px] transform space-y-6 overflow-hidden rounded-lg bg-white p-4 text-center shadow-xl transition-all">
        <div className="h-full w-full px-6">
          <div className="flex justify-between pt-4">
            <h3 className="">{format(startMonth, 'yyyy년 M월')}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const currentMonth = bufferDates[0];
                  changeBufferDates(currentMonth);
                }}
              >
                <Icon.ChevronLeft />
              </button>
              <button
                onClick={() => {
                  const currentMonth = bufferDates[2];
                  changeBufferDates(currentMonth);
                }}
              >
                <Icon.ChevronRight />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-13 font-semibold text-slate-500">
            <div className="text-red-2 bg-white pt-3 text-red-500">일</div>
            <div className="bg-white pt-3">월</div>
            <div className="bg-white pt-3">화</div>
            <div className="bg-white pt-3">수</div>
            <div className="bg-white pt-3">목</div>
            <div className="bg-white pt-3">금</div>
            <div className="text-blue-1 bg-white pt-3 text-blue-500">토</div>
          </div>
          <div className="flex text-slate-400">
            <div className="grid w-full grid-cols-7 grid-rows-6 gap-px ">
              {map(days, (day) => {
                return (
                  <button
                    disabled={!isSameMonth(day, startMonth)}
                    onClick={() => {
                      changeBufferDates(day);
                      const _newDate = setHours(
                        setMinutes(day, initMinute),
                        initHour
                      );
                      setSelectedDate(_newDate);
                      onClose();
                    }}
                    key={day.toISOString()}
                    className={twMerge(
                      'flex-colfocus:z-10 group flex h-12 text-18',
                      selectedDate &&
                        isSameDay(day, selectedDate) &&
                        isAfter(day, new Date()) &&
                        'text-20'
                    )}
                  >
                    <time
                      dateTime={day.toISOString()}
                      className={twMerge(
                        'mx-auto flex h-10 w-10 items-center justify-center rounded-full text-center',
                        isSaturday(day) && 'text-blue-500',
                        isSunday(day) && 'text-red-500',
                        isSameDay(day, new Date()) && 'font-bold text-brand-1',
                        selectedDate &&
                          isSameDay(day, selectedDate) &&
                          ' bg-slate-800 text-white',
                        !isSameMonth(day, startMonth) && 'text-white',
                        isSameDay(day, new Date()) &&
                          selectedDate &&
                          isSameDay(day, selectedDate) &&
                          'bg-brand-1 font-bold text-white'
                      )}
                    >
                      {getDate(day)}
                    </time>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimationLayout>
  );
};

export default DatePickerModal;
