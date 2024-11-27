import React, { useState } from 'react';
import styles from'./index.less';

const Select = (props) => {
    const {mode,options, placeholder} = props
    const [selectItem, setSelectItem] = useState(mode ==='multi' ? [] : null);
    const [open, setOpen] = useState(false);
    
    const handleSearch = (option) =>{
        if(mode === 'multi'){
            const selectedOptions = selectItem.includes(option)? selectItem.filter(item => item !== option) : [...selectItem, option];
            setSelectItem(option);
        }else{
            setSelectItem(option);
        }
    }
    
    const onClear = ()=>{
        setSelectItem(mode ==='multi' ? [] : null);
    }
    
    const onOpen = ()=>{
        setOpen(!open);
    }
    
    return (
        <div className={styles.panel}>
            <div className={styles.searchInfo} onClick={onOpen}>
                (mode === 'multi'? selectItem?.join(","): selectItem): placeholder
                <span className={styles.clearIcon} onClick={onClear}>x</span>
            </div>
            {open && (
                <ul className={styles.options}>
                    {options.map((option) => (
                        <li
                        className = { (mode === "multi"? selectItem.includes(option) : selectItem === option) ? "selected" : ""} 
                        key={option} 
                        onClick={() => handleSearch(option)}>{option}</li>
                    ))
                    }
                </ul>
            )}
        </div>
    )
};
export default Select;
//做一个单选和多选，支持清除