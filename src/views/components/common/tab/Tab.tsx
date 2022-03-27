import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NoBorderButton } from '@/views/components/common/button/Button';

interface PropsType {
  list: string[];
  selected?: number;
  ripple?: boolean;
  className?: string;
  onChange?: (value: number, name?: string) => void;
}

const Tab = ({ list, selected, ripple = true, className, onChange }: PropsType) => {
  const [state, setState] = useState(0);

  const changeIndex = (idx: number) => {
    setState(idx);
    onChange && onChange(idx);
  };

  useEffect(() => {
    if (selected !== undefined) changeIndex(selected);
  }, [selected]);

  return (
    <div className={className}>
      {list.map((item, index) => (
        <NoBorderButton
          key={index}
          ripple={ripple}
          className={`${state === index ? 'active' : ''}`}
          onClick={() => changeIndex(index)}
        >
          {item}
        </NoBorderButton>
      ))}
    </div>
  );
};

const TabStyle = styled(Tab)`
  ${NoBorderButton} {
    &.active {
      background-color: #ddd;
    }
  }
`;

export default TabStyle;
