import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Select from './Select';


const options = ["地理",'历史','政治','生物','化学','物理']
const root = ReactDOM.createRoot(document.getElementById('root')! as HTMLElement);
root.render(
    <React.Fragment>
        <Select options = {options} mode="multi" placeholder='请选择'/>
    </React.Fragment>
)
//export default Select;