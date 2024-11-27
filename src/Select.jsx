import React, { useState } from 'react';
import styles from './index.css';

const Select = (props) => {
  const { mode, options, placeholder } = props;
  const [selectItem, setSelectItem] = useState(mode === 'multi' ? [] : null);
  const [open, setOpen] = useState(false);

  const handleSearch = (option) => {
    if (mode === 'multi') {
      // 如果是多选模式，切换选择状态
      const isSelected = selectItem.includes(option);
      const newSelection = isSelected
        ? selectItem.filter(item => item !== option)
        : [...selectItem, option];
      setSelectItem(newSelection);
    } else {
      // 单选模式直接设置选项
      setSelectItem(option);
    }
  };

  const onClear = () => {
    setSelectItem(mode === 'multi' ? [] : null);
  };

  const onOpen = () => {
    setOpen(!open);
  };

  return (
    <div className='panel'>
      <div className={`searchInfo ${open ? styles.open : ''}`} onClick={onOpen}>
        {selectItem && (mode === 'multi' ? selectItem.join(", ") : selectItem) || placeholder}
        <span className='clearIcon' onClick={onClear}>x</span>
        <span className='dropdownArrow' style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}></span>
      </div>
      {open && (
        <ul className='options'>
          {options.map((option) => (
            <li
              className={(mode === "multi" ? selectItem.includes(option) : selectItem === option) ? styles.selected : ""}
              key={option}
              onClick={() => handleSearch(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;