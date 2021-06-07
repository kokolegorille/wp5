import React from "react";

import { capitalizeFirst } from "./helpers";

const Input = ({ label, register, registerParams, error, ...otherProps }) => (
    <div className="form-group">
        <label>{capitalizeFirst(label)}</label>
        <input {...otherProps} {...register(label, registerParams)} />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);

export default Input;