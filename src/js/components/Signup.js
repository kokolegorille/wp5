import React from "react";
import { useForm } from "react-hook-form";

import { useAppAuth } from "../hooks/useApp";
import Input from "./form/Input";
import { handleError } from "./form/helpers";

const Signup = () => {
    const { state, actions } = useAppAuth();
    const { errorMessage } = state;
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = d => actions.signup(d);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign up</h3>
            {
                errorMessage &&
                <p className="error">{errorMessage}</p>
            }
            <Input 
                label="name" 
                register={register} 
                registerParams={{ required: true, maxLength: 32 }} 
                error={handleError("name", errors["name"] || state.errors["name"])}
                className="form-control" />
            <Input 
                label="email" 
                register={register} 
                registerParams={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }} type="email" 
                // registerParams={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }} type="email" 
                error={handleError("email", errors["email"] || state.errors["email"])}
                className="form-control" />
            <Input 
                label="password" 
                register={register} 
                registerParams={{ required: true, minLength: 6, maxLength: 32 }} 
                error={handleError("password", errors["password"] || state.errors["password"])}
                type="password" 
                className="form-control" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Signup;