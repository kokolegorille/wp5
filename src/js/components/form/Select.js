import React from "react";

import { capitalizeFirst } from "./helpers";

const Select = ({ label, register, registerParams, error, options, ...otherProps }) => (
    <div className="form-group">
        <label>{capitalizeFirst(label)}</label>
        <select {...otherProps} {...register(label, registerParams)}>
            {
                options.map(option => {
                    const { label, value, ...others } = option;
                    return (
                        <option
                            key={label}
                            value={value}
                            {...others} >
                            {option.label}
                        </option>)
                })
            }
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);

export default Select;