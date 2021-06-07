import React from "react";

import { capitalizeFirst } from "./helpers";

const Input = ({ label, register, registerParams, ...otherProps }) => (
    <div>
        <label>{capitalizeFirst(label)}</label>
        <input {...otherProps} {...register(label, registerParams)} />
    </div>
);

export default Input;