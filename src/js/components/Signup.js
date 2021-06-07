import React from "react";
import { useForm } from "react-hook-form";

import { useAppAuth } from "../hooks/useApp";
import Input from "./form/Input";

const Signup = () => {
    const { actions } = useAppAuth();

    const { register, handleSubmit } = useForm();

    const onSubmit = d => actions.signup(d);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="name" register={register} registerParams={{ required: true, maxLength: 32 }} />
            <Input label="email" register={register} registerParams={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }} type="email" />
            <Input label="password" register={register} registerParams={{ required: true, minLength: 6, maxLength: 32 }} type="password" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Signup;