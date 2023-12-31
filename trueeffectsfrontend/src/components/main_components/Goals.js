import React from 'react';
import DatePicker from "react-datepicker";
import '../../sass/addgoals.css';
import "react-datepicker/dist/react-datepicker.css";
import {convertDate} from "../helpers/function_helpers";
import {createGoalValidation} from "../validation/validation";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {getGoals, postGoal, postGoals} from "../../redux/actions/trainingActions";


const Goals = () => {
    const {values, setFieldValue, handleSubmit, handleChange, errors} = useFormik({
        initialValues: {
            goal: '',
            description: '',
            finishDate: null,
            finishJsDate: null,
        },
        validationSchema: createGoalValidation,
        validateOnChange: false,
        validationOnBlue: false,
        onSubmit: values => {
            handleSendGoals(values)
        },
    });
    console.log("errors")
    console.log(errors)
    const handleDate = (date) => {
        const convertedDate = convertDate(date)
        setFieldValue("finishDate", convertedDate)
        setFieldValue("finishJsDate", date)
    }
    const handleSendGoals = async () => {
        console.log("sendGoals")
        const data = {
            "finish_date": values.finishDate,
            "goal": values.goal,
            "description": values.description,
        }
        console.log(data)
        // console.log(errors)
        // console.log("errors")
        await postGoals(data)
        // await getGoals()
        // history.push("/")
    }
    return (
        <div className="goals">
            <div className="goals__displaycontainers">
                <div className="goals__displaycontainers__unrealized">Niezrealizowane</div>
                <div className="goals__displaycontainers__realized">Zrealizowane</div>
            </div>
            <div className="goals__createcontainer">
                <form onSubmit={handleSubmit}>
                    <div className="goals__createcontainer__datepicker-label">Termin w jakim planujesz zrealizować swój
                        cel
                    </div>
                    <div className="goals__createcontainer__datepicker-input"><DatePicker locale='pl'
                                                                                          placeholderText={"Wybierz date"}
                                                                                          dateFormat='dd/MM/yyyy'
                                                                                          selected={values.finishJsDate}
                                                                                          onChange={date => handleDate(date)}
                    />
                    </div>
                    {errors.finishDate && <p>{errors.finishDate}</p>}
                    <div className="goals__createcontainer__goalcontainer">
                        <div className="goals__createcontainer__goalcontainer-label">
                            Stwórz cel treningowy
                        </div>
                        <div className="goals__createcontainer__goalcontainer-input">
                            <input name="goal" type="text" value={values.goal} onChange={handleChange}/>
                        </div>
                        {errors.goal && <p>{errors.goal}</p>}
                    </div>

                    <div className="goals__createcontainer__descriptioncontainer">
                        <div className="goals__createcontainer__descriptioncontainer-label">
                            Opis celu
                        </div>
                        <div className="goals__createcontainer__descriptioncontainer-input">
                        <textarea name="description" cols="50" rows="10" value={values.description}
                                  onChange={handleChange}></textarea>
                            {errors.description && <p>{errors.description}</p>}
                        </div>
                    </div>

                    <div className="goals__createcontainer__buttoncontainer">
                        <button className="goals__createcontainer__buttoncontainer-button"
                                onClick={handleSendGoals}>Wyślij
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, {postGoal, getGoals})(Goals);
