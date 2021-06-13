import React from "react";

import { capitalizeFirst } from "./helpers";

const TextArea = ({ label, register, registerParams, error, ...otherProps }) => (
    <div className="form-group">
        <label>{capitalizeFirst(label)}</label>
        <textarea {...otherProps} {...register(label, registerParams)} />
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
);

export default TextArea;