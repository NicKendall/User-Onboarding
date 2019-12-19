import React from "react";
import {withFormik, Form, Field } from "formik";

function OnboardForm() {

    return (
    <Form>
        Test
        <Field>

        </Field>


    </Form>
    
    )
}

const FormikForm = withFormik({})(OnboardForm)

export default FormikForm