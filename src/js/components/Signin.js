import React from "react";
import { useForm } from "react-hook-form";

import { useAppAuth } from "../hooks/useApp";
import Input from "./form/Input";
import { handleError } from "./form/helpers";

const Signin = () => {
    const { actions } = useAppAuth();

    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = d => actions.signin(d);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign in</h3>
            <Input 
                label="name" 
                register={register} 
                registerParams={{ required: true, maxLength: 32 }} 
                error={handleError("name", errors["name"])}
                className="form-control" />
            <Input 
                label="password" 
                register={register} 
                registerParams={{ required: true, minLength: 6, maxLength: 32 }} 
                error={handleError("password", errors["password"])}
                type="password" 
                className="form-control" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Signin;