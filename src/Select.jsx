import React, { useState } from 'react';
import styles from'./index.less';

// interface SelectProps {
//     options:string[];
//     mode:string;
//     placeholder:string;

// }

const Select = (props) => {
    const {mode,options, placeholder} = props
    const [selectItem, setSelectItem] = useState(mode ==='muti' ? [] : null);
    const [open, setOpen] = useState(false);
    
    const handleSearch = (option) =>{
        if(mode === 'muti'){
            const selectedOptions = selectItem.includes(option)? selectItem.filter(item => item !== option) : [...selectItem, option];
            setSelectItem(option);
        }else{
            setSelectItem(option);
        }
    }
    
    const onClear = ()=>{
        setSelectItem(mode ==='muti' ? [] : null);
    }
    
    const onOpen = ()=>{
        setOpen(!open);
    }
    
    return (
        <div className={styles.panel}>
            <div className={styles.searchInfo} onClick={onOpen}>
                (mode === 'muti'? selectItem?.join(","): selectItem): placeholder
                <span className={styles.clearIcon} onClick={onClear}>x</span>
                //添加清除的icon
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