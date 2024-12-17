import React, { useState } from "react";
import styles from "./index.css";

const Select = (props) => {
  const { mode, options, placeholder } = props;
  const [selectItem, setSelectItem] = useState(mode === "multi" ? [] : null);
  const [open, setOpen] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  // 新增：存储过滤后的选项列表状态
  const [filteredOptions, setFilteredOptions] = useState(options);

  const onChange = (option) => {
    if (mode === "multi") {
      // 如果是多选模式，切换选择状态
      const isSelected = selectItem.includes(option);
      const newSelection = isSelected
        ? selectItem.filter((item) => item !== option)
        : [...selectItem, option];
      setSelectItem(newSelection);
      setShowClear(!!newSelection); //选中下拉值后再展示清除符号
    } else {
      // 单选模式直接设置选项
      setSelectItem(option);
    }
  };

  // 添加搜索功能，根据搜索关键词过滤选项
  const onSearch = (searchItem) => {
    setSearchItem(searchItem);
    if (searchItem === "") {
      setFilteredOptions(options);
    } else {
      const filteredOptions = options.filter((option) =>
        option?.toLowerCase().includes(searchItem?.toLowerCase())
      );
      setFilteredOptions(filteredOptions);
    }
  };

  //清除关键词
  const onClear = () => {
    setSelectItem(mode === "multi" ? [] : null);
    setShowClear(false);
  };

  //输入框下拉打开或关闭
  const onOpen = () => {
    setOpen(!open);
    console.log("onOpen", open);
  };

  //获取焦点
  const handleInputFocus = () => {
    setOpen(true);
    setSelectItem(mode === "multi" ? [] : null);
    const searchInfoDiv = document.getElementById("inputBox");
    if (searchInfoDiv) {
      console.log("获取焦点");
      searchInfoDiv.focus();
    }
  };

  //失去焦点
  const handleInputBlur = () => {
    setOpen(false);
  };
  //静态输入框展示下拉符号，点击后展示搜索符号，选中某个选项后再展示清除符号
  //TODO:出现搜索图标时整个输入框需要变为可输入状态，且出现光标
  //fix：点击页面中其他位置下拉框没有自动收起
  return (
    <div className="panel">
      <div id="inputBox" className={`${open ? "openSearch" : "searchInfo"}`}           
          onClick={onOpen}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}>
          {(selectItem &&(mode === "multi" ? selectItem.join(", ") : selectItem)) ||placeholder}
          {showClear ? (
            <span className="clearImg" onClick={onClear}></span>
          ) : open ? (<span className="searchImg"
              onClick={(e) => onSearch(e.target.value)}
              onFocus={handleInputFocus}
            ></span>
          ) : (
            <span className="dropDownImg"></span>
          )}
      </div>
      {open && (
        <ul className="options">
          {filteredOptions.map((option) => (
            <li
              //className={mode === "multi" ? selectItem.includes(option) : selectItem === option}
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
