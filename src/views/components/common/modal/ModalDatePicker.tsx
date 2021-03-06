import { useState } from 'react';
import styled from 'styled-components';
import { ModalStyle } from '@/views/components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import BasicButton from '@/views/components/common/button/Button';
// import Calendar from '@/views/components/common/Calendar';
import Calendar from 'react-calendar';
import { dateFormat } from '@/utils/dateUtils';
import 'react-calendar/dist/Calendar.css';

interface PropsType extends ModalComponentPropsType {
  initialFocusedDate?: string;
}

const ModalDatePicker = ({
  initialFocusedDate,
  className,
  nonModal,
  close,
  resolve,
}: PropsType) => {
  const [date, setDate] = useState<string | null>(null);

  const formatDate = (calendarLocale: string, date: Date) => {
    return dateFormat(date, 'd');
  };

  return (
    <ModalDatePickerStyle
      className={className}
      close={close}
      nonModal={nonModal}>
      <div className="calender-cont">
        <Calendar
          calendarType="US"
          defaultView="month"
          maxDetail="month"
          view="month"
          locale="ko-KR"
          formatDay={formatDate}
          value={initialFocusedDate ? new Date(initialFocusedDate) : new Date()}
          onChange={(val: Date) => setDate(dateFormat(val, 'yyyy-MM-dd'))}
          // orientation="portrait"
          // initialFocusedDate={initialFocusedDate}
          // onChange={setDate}
        />
        <div className="btn-holder">
          <BasicButton onClick={close}>취소</BasicButton>
          <BasicButton onClick={() => resolve && resolve(date)}>
            선택
          </BasicButton>
        </div>
      </div>
    </ModalDatePickerStyle>
  );
};

const ModalDatePickerStyle = styled(ModalStyle)`
  .calender-cont {
    border-radius: 5px;
    overflow: hidden;
  }

  .btn-holder {
    padding: 8px 0;
    text-align: right;
    background-color: #fff;
    border-top: 1px solid #000;

    ${BasicButton} {
      min-width: 77px;
      min-height: 36px;
      margin-left: 5px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      color: #1574bd;
    }
  }

  .react-calendar__tile—active:hover {
    background-color: #ff0000;
  }
`;

export default ModalDatePicker;
