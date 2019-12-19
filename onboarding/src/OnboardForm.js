import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function OnboardForm({values, errors, touched, status}) {

    const [onboard, setOnboard] = useState([]);
    const [users, setUsers] = ([]);

    useEffect(() => {
        console.log("status has changed", status)
        status && setOnboard(onboard => [...onboard, status])
    }, [status])

    return (
        <div className="firm-container">
            <Form>
                <div className="error-display">
                    {touched.name && errors.name && (
                    <p>{errors.name}</p>                    
                    )}
                    {touched.email && errors.email && (
                    <p>{errors.email}</p>
                    )}
                </div>
                <label htmlFor="name">
                    Name: 
                    <Field 
                        type="text"
                        id="name"
                        name="name"
                    />                    
                </label>
            <br />
                
                <label htmlFor="email">
                    Email: 
                    <Field 
                        type="email"
                        id="email"
                        name="email"
                    />                    
                </label>
            <br />
            <div>{touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}</div>
                <label htmlFor="password">
                    Password: 
                    <Field 
                        type="password"
                        id="password"
                        name="password" 
                    />  
                </label>            
            <br />
           
                <label>
                    TOC:
                    <Field 
                        type="checkbox"
                        id="toc"
                        name="toc"
                    />            
                </label>
            <br />   
                <button type="submit">Submit</button>
            </Form>

            {onboard.map((board, index) => (

                <ul key={index}>
                    <li>name: {board.name}</li>
                    <li>name: {board.email}</li>
                    <li>name: {board.password}</li>
                </ul>

            ))}

        </div>        
    )
}

const FormikForm = withFormik({
    mapPropsToValues( {name, email, password, toc} ) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            toc: toc || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().min(6).required()       
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting...", values)
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log(`success`, res)
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response))
    }
})(OnboardForm)

export default FormikForm
