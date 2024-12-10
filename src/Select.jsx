import React, { useState } from 'react';
import styles from './index.css';

const Select = (props) => {
  const { mode, options, placeholder } = props;
  const [selectItem, setSelectItem] = useState(mode === 'multi' ? [] : null);
  const [open, setOpen] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [searchItem, setSearchItem] = useState('');
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
 const onSearch = (searchItem) => {
    setSearchItem(searchItem)
    if (searchItem === '') {
      setFilteredOptions(options);
    }else{
        const filteredOptions = options.filter(option => option?.toLowerCase().includes(searchItem?.toLowerCase()));
        setFilteredOptions(filteredOptions);
    }

};

 //清除关键词
  const onClear = () => {
    setSelectItem(mode === 'multi' ? [] : null);
    setShowClear(false);
  };

  //输入框下拉打开或关闭
  const onOpen = () => {
    setOpen(!open);
  };
  
  //获取焦点
  const handleInputFocus = () => {
    setOpen(true);
    const searchInfoDiv  = document.querySelector('.searchInfo');
    if(searchInfoDiv){
      searchInfoDiv.focus()
    }
  }
  
  //失去焦点
  const handleInputBlur = () => {
   setOpen(false);
  }

  //修改交互，静态输入框展示下拉符号，点击后展示搜索符号，选中某个选项后再展示清除符号
  //TODO:出现搜索框但是没有光标闪烁，无法执行搜索
  return (
    <div className='panel'>
      <div className={`searchInfo ${open ? styles.open : ''}`} onClick={onOpen} onBlur={handleInputBlur} onFocus={handleInputFocus}>
        {selectItem && (mode === 'multi' ? selectItem.join(", ") : selectItem) || placeholder}
        {showClear ? (<span className='clearImg' onClick={onClear}></span>) :
            (open ? (<span className='searchImg' onClick = {(e)=>onSearch(e.target.value)} ></span>) : (<span className='dropDownImg'></span>))} 
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