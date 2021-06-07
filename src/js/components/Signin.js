import React from "react";
import { useForm } from "react-hook-form";

import { useAppAuth } from "../hooks/useApp";
import Input from "./form/Input";

const Signin = () => {
    const { actions } = useAppAuth();

    const { register, handleSubmit } = useForm();

    const onSubmit = d => actions.signin(d);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="name" register={register} registerParams={{ required: true, maxLength: 32 }} />
            <Input label="password" register={register} registerParams={{ required: true, minLength: 6, maxLength: 32 }} type="password" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Signin;