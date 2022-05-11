import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Form = () => {
    const [formInfo, setFormInfo] = useState({
        resource: '',
        id: ''
    })
    const history = useHistory();

    const changeHandler = (e) => {
        let {...copyInfo} = formInfo;

        setFormInfo({...copyInfo, [e.target.name]: e.target.value});
        console.log(formInfo); 
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formInfo.resource, formInfo.id);
        // passing state variables into history.push() to define route
        history.push(`/card/${formInfo.resource}/${formInfo.id}`);
        
    }

    return (
        <>
                <div className="mt-3">
                    <form onSubmit={submitHandler}>
                        <h1>Welcome to Han Shot First</h1>
                        <div className="form-group d-flex justify-content-center gap-2">
                            <div>
                                <label htmlFor="resource"><strong>Search For:</strong></label>
                                <select onChange={changeHandler} name="resource" id="resource">
                                    <option value="" disabled>Please Select a Resource</option>
                                    <option value="people">People</option>
                                    <option value="planets">Planets</option>
                                    <option value="species">Species</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="id"><strong>ID</strong>:</label>
                                <input type="number" name="id" min="0" onChange={changeHandler} value={formInfo.id} />
                            </div>
                            <div>
                                <input type="submit" className="btn btn-dark" value="Search"/>
                            </div>
                        </div>
                    </form>
                </div>
        </>
    )

}

export default Form;