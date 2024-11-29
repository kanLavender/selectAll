import React, { useState } from 'react';
import styles from './index.css';

const Select = (props) => {
  const { mode, options, placeholder } = props;
  const [selectItem, setSelectItem] = useState(mode === 'multi' ? [] : null);
  const [open, setOpen] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
    // 新增：存储过滤后的选项列表状态
  const [filteredOptions, setFilteredOptions] = useState(options);

  const onChange = (option) => {
    if (mode === 'multi') {
      // 如果是多选模式，切换选择状态
      const isSelected = selectItem.includes(option);
      const newSelection = isSelected
        ? selectItem.filter(item => item !== option)
        : [...selectItem, option];
      setSelectItem(newSelection);
      setShowClear(!!newSelection);//选中下拉值后再展示清除符号
    } else {
      // 单选模式直接设置选项
      setSelectItem(option);
    }
  };
  
 // 添加搜索功能，根据搜索关键词过滤选项
 const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredOptions(filteredOptions);
};

  const onClear = () => {
    setSelectItem(mode === 'multi' ? [] : null);
    setShowClear(false);
  };

  const onOpen = () => {
    setOpen(!open);
  };

  //修改交互，静态输入框展示下拉符号，点击后展示搜索符号，选中某个选项后展示清除符号
  return (
    <div className='panel'>
      <div className={`searchInfo ${open ? styles.open : ''}`} onClick={onOpen} onChange = {(e)=>onSearch(e.target.value)} >
        {selectItem && (mode === 'multi' ? selectItem.join(", ") : selectItem) || placeholder}
        {showClear && <span className='clearIcon' onClick={onClear}>x</span>} 
        
        <span className='dropdownArrow' style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}></span>
      </div>
      {open && (
        <ul className='options'>
          {filteredOptions.map((option) => (
            <li
              className={(mode === "multi" ? selectItem.includes(option) : selectItem === option) ? styles.selected : ""}
              key={option}
              onClick={() => onChange(option)}
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