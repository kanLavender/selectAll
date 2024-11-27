import React from 'react';
import Select from './Select';


function SelectAll() {
    const props = {
        mode: 'multi',
        placeholder: '请选择',
        options: ["萧山区", "钱塘区", "西湖区", "余杭区", "滨江区", "上城区"]
    };

    return (
        <div className='selectWrap'>
            <Select {...props} />
        </div>
    );
}

export default SelectAll;
