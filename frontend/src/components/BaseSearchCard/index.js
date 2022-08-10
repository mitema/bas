

import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import BaseSearchCardFields from "./BaseSearchCardFields";
import {createSearch} from "../../services/searchService";


const BaseSearchCard = (props) => {
    const initialValues = {
        what: '',
        where: '',
        distance: '',
        date: '',
        experience: [],
    }

    const [formDisabled, setFormDisabled] = useState(false)

    const handleSubmit = async (values) => {
        console.log('values', values)
        console.log('submit')
        await createSearch(values)
        setFormDisabled(true)
    }


    const other = {...props, formDisabled}
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            {(formikProps) => {
                return (
                    <Form>
                        <BaseSearchCardFields formikProps={formikProps} {...other}/>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default BaseSearchCard