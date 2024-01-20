import React, {useState} from 'react';
import {Field, Formik} from "formik";
import {connect} from "react-redux";
import {createTraining, deleteCurrentTraining, updateTraining} from "../../redux/actions/trainingActions";
import DatePicker from "react-datepicker";
import {convertDate} from "../helpers/function_helpers";
import {useHistory} from "react-router-dom";
import {handleMoveToTraining} from "../helpers/history_helpers";
import "../../new_sass/modify_training.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddTrainingToDifferentDayModal from "../modify_training/modals/AddTrainingToDifferentDayModal";
import RemoveTrainingModal from "../modify_training/modals/RemoveTrainingModal";

const ModifyTrainingv2 = (props) => {

    const history = useHistory()
    const [visibleElements, setVisibleElements] = useState([]);
    const [removeTrainingModal, setRemoveTrainingModal] = useState(false);
    const [differentDayModal, setDifferentDayModal] = useState(false);
    const handleModifyTraining = async (data) => {
        await props.updateTraining(data)
    }
    const handleCopyTrainingToAnotherDate = async (data) => {
        await props.createTraining(data)
    }

    const handleDeleteTraining = async (id) => {
        await props.deleteCurrentTraining(id)
    }
    const handleDate = (date, values) => {
        values.date = date

    }


    const toggleVisibility = (elementId) => {
        setVisibleElements((prevVisibleElements) => {
            if (prevVisibleElements.includes(elementId)) {
                return prevVisibleElements.filter((id) => id !== elementId);
            } else {
                return [...prevVisibleElements, elementId];
            }
        });
    };

    return (
        <div className="modify-training">
            <RemoveTrainingModal id={props.training.id} show={removeTrainingModal} handleClose={setRemoveTrainingModal} handleDeleteTraining={handleDeleteTraining}/>
            <AddTrainingToDifferentDayModal show={differentDayModal} handleClose={setDifferentDayModal} />
            <Formik
                initialValues={props.training}
                onSubmit={(values, {setSubmitting}) => {
                    console.log("submit")
                    handleModifyTraining(values)
                }}>
                {({
                      values,
                      setFieldValue,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form className="modify-training__form" onSubmit={handleSubmit}>
                        <div className="mt-data modify-training__mt-data">
                            <h1 className="title modify-training__title">Modyfikuj Trening</h1>
                            <DatePicker locale='pl'
                                        name="date"
                                        value={values.date}
                                        className="create-training__datepicker animated-datepicker"
                                        placeholderText={"Wybierz date treningu"}
                                        dateFormat='yyyy-MM-dd'
                                        onChange={(date) => setFieldValue('date', convertDate(date))
                                        }
                            />
                            <div className="mt-data__buttons">
                                <button className="standard-button"
                                        onClick={() => setRemoveTrainingModal(true)}>Usuń trening -
                                </button>
                                <button className="standard-button"
                                        onClick={() => handleMoveToTraining(history)}>Trenuj ->
                                </button>
                                <button className="standard-button"
                                        onClick={() => setDifferentDayModal(true)}>Dodaj trening do
                                    innego dnia +
                                </button>
                                {/*<button className="standard-button" type="submit">Modyfikuj trening</button>*/}

                            </div>
                            <div className="animatedInput">
                                <Field onChange={handleChange} name="name" value={values.name} type="text"/>
                                <span>Nazwa Treningu</span>
                            </div>

                            <div className="animatedInput">
                                <Field onChange={handleChange} name="description" value={values.description}
                                       type="text"/>
                                <span>Opis treningu</span>
                            </div>
                            <div className="mt-data--list">
                                <div className="mt-data__buttons">
                                    {/*<button className="standard-button"*/}
                                    {/*        onClick={() => handleMoveToTraining(history)}>Trenuj ->*/}
                                    {/*</button>*/}
                                    {/*<button className="standard-button"*/}
                                    {/*        onClick={() => handleDeleteTraining(values.id)}>Usuń trening -*/}
                                    {/*</button>*/}
                                    {/*<button className="standard-button"*/}
                                    {/*        onClick={() => handleCopyTrainingToAnotherDate(values)}>Dodaj trening do*/}
                                    {/*    innego dnia +*/}
                                    {/*</button>*/}
                                    <button className="standard-button" type="submit">Modyfikuj trening</button>

                                </div>
                                <div className="multiseries mt-data__multiseries">
                                    {values.multi_series.map((multiseries, index) => {
                                        return (
                                            <div className="multi-element multiseries__multi-element--collapse">
                                                <div className="multi-element__container"
                                                     onClick={() => toggleVisibility(multiseries)}>
                                                    <div
                                                        className="multi-element__name">{multiseries.exercise.name}</div>
                                                    <span className="buttons__button multi-element__button"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </span>
                                                </div>
                                                <div
                                                    className="single-series multi-element__single-series--expanded">
                                                    {visibleElements.includes(multiseries) && multiseries.single_series.map((singleseries, indexv2) => {
                                                        return (
                                                            <div className="single-series__element">
                                                                <p className="single-series__series-num">Seria {indexv2 + 1}</p>
                                                                <div className="animatedInput">
                                                                    <Field onChange={handleChange}
                                                                           name={`multi_series[${index}].single_series[${indexv2}].reps`}
                                                                           value={singleseries.reps}
                                                                           type="text"/>
                                                                    <span>Liczba powtórzeń</span>
                                                                </div>
                                                                <div className="animatedInput">
                                                                    <Field onChange={handleChange}
                                                                           name={`multi_series[${index}].single_series[${indexv2}].rest`}
                                                                           value={singleseries.rest}
                                                                           type="text"/>
                                                                    <span>Odpoczynek</span>
                                                                </div>
                                                                <div className="animatedInput">
                                                                    <Field onChange={handleChange}
                                                                           name={`multi_series[${index}].single_series[${indexv2}].concentricphase`}
                                                                           value={singleseries.concentric_phase}
                                                                           type="text"/>
                                                                    <span>Faza koncentryczna</span>
                                                                </div>
                                                                <div className="animatedInput">
                                                                    <Field
                                                                        onChange={handleChange}
                                                                        name={`multi_series[${index}].single_series[${indexv2}].pause_after_concentric_phase`}
                                                                        value={singleseries.pause_after_concentric_phase}
                                                                        type="text"/>
                                                                    <span>Pauza po fazie koncentrycznej</span>
                                                                </div>
                                                                <div
                                                                    className="animatedInput">
                                                                    <Field
                                                                        value={singleseries.eccentric_phase}
                                                                        name={`multi_series[${index}].single_series[${indexv2}].eccentricphase`}
                                                                        onChange={handleChange} type="text"/>
                                                                    <span>Faza ekscentryczna</span>
                                                                </div>
                                                                <div
                                                                    className="animatedInput">
                                                                    <Field
                                                                        name={`multi_series[${index}].single_series[${indexv2}].pause_after_eccentric_phase`}
                                                                        value={singleseries.pause_after_eccentric_phase}
                                                                        onChange={handleChange} type="text"/>
                                                                    <span>Pauza po fazie ekscentrycznej</span>
                                                                </div>

                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {/*<button onClick={() => handleModifyTraining(values)}>*/}
                            {/*    Modyfikuj*/}
                            {/*</button>*/}
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        training: state.training.training,
    }
}
export default connect(mapStateToProps, {updateTraining, createTraining, deleteCurrentTraining})(ModifyTrainingv2);