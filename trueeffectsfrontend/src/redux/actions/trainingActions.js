import {
    CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
    GET_LAST_COMPLETED_TRAININGS,
    GET_TRAININGS_ERROR,
    GET_TRAININGS_LOADING,
    GET_TRAININGS_SUCCESS,
    GET_UPCOMING_TRAININGS,
    GET_USER_COMPLETED_GOALS_SUCCESS,
    GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS,
    GET_USER_DIMENSION_CONFIGURATION_SUCCESS,
    GET_USER_DIMENSIONS_FOR_CREATE,
    GET_USER_DIMENSIONS_SUCCESS,
    GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
    PUT_USER_DIMENSION_CONFIGURATION_SUCCESS,
    UPDATE_SINGLE_TRAINING_SUCCESS,
} from './types';
import axios from 'axios';

const TRUEEFFECTS_URL = process.env.REACT_APP_TRUEEFFECTS_URL

export const postGoal = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/user_goal/`, data)
        .then(res => {
            alert("Cel został dodany")
        })
}

export const getCompletedGoals = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_goal/completed/`)
        .then(res => dispatch({
            type: GET_USER_COMPLETED_GOALS_SUCCESS,
            payload: res.data,
        }));
}


export const getGoalsToAchieve = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_goal/`)
        .then(res => dispatch({
            type: GET_USER_GOALS_TO_ACHIEVE_SUCCESS,
            payload: res.data,
        }));
}

export const putGoal = (data, id) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/user_goal/${id}/`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}


export const postDimension = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/user_dimension/`, data)
        .then(res => {
            alert("Pomiar został dodany")
        })
}

export const putDimension = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/user_dimension/`, data)
        .then(
            alert("Pomiar został zaaktualizowany")
        )
}

export const getDimensions = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSIONS_SUCCESS,
            payload: res.data,
        }));
}

export const getUserDimensionsForCreate = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension/get_user_dimensions_for_create/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSIONS_FOR_CREATE,
            payload: res.data,
        }));
}

export const getTrainings = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    dispatch({
        type: GET_TRAININGS_LOADING
    })
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/trainings/`)
        .then(res => dispatch({
            type: GET_TRAININGS_SUCCESS,
            payload: res,
        }))
        .catch(() => dispatch({
            type: GET_TRAININGS_ERROR
        }))
}

// #TODO Think about it
export const postSingleSeries = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/training/singleseries/`, data)
        .then(res => {
            return res.data
        });
}

export const postMultiSeries = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/training/multiseries/`, data)
        .then(res => {
            return res.data
        });
}

export const putDimensionConfiguration = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/user_dimension_configuration/${data.id}/`, data)
        .then(res => dispatch({
            type: PUT_USER_DIMENSION_CONFIGURATION_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
        })
}

export const getDimensionConfiguration = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension_configuration/get_user_dimension_config/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSION_CONFIGURATION_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
        })

}

export const getDimensionConfigurationForCompare = () => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/user_dimension_configuration/get_user_dimensions_configuration_for_compare/`)
        .then(res => dispatch({
            type: GET_USER_DIMENSION_CONFIGURATION_FOR_COMPARE_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err.response)
        })

}


export const getSingleTraining = (id) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/single_training/${id}/get_training_by_id/`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            throw err
        })
    // .then(res => dispatch({
    //     type: GET_SINGLE_TRAINING_SUCCESS,
    //     payload: res.data
    // }))
}

export const updateTraining = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.put(`${TRUEEFFECTS_URL}/api/v1/single_training/${data.id}/update_training/`, data)
        .then(res => dispatch({
            type: UPDATE_SINGLE_TRAINING_SUCCESS,
            payload: res.data
        }))
}

export const createTraining = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/single_training/`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            // return err.response.data
            throw err
        })
    // .then(res => dispatch({
    //     type: CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
    //     payload: res.data
    // }))
    // .catch(err => {
    //     dispatch({
    //         type: CREATE_SINGLE_TRAINING_ERROR,
    //         payload: err.response.data
    //     })
    // })

}

export const deleteCurrentTraining = (id) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.delete(`${TRUEEFFECTS_URL}/api/v1/single_training/${id}/`)
        .then(res => dispatch({
            type: CREATE_SINGLE_TRAINING_BASED_ON_OLD_SUCCESS,
            payload: res.data
        }))
}

export const getExercises = (param) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/exercise/?name=${param}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
            return err
        })
}
export const createUserExercise = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.post(`${TRUEEFFECTS_URL}/api/v1/exercise/post_user_exercise/`, data)
        .then(res => {
            return res
        })
        .catch(err => {
            // return err.response.data
            throw err
        })
}

export const getLastCompletedTrainings = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/trainings/get_last_completed_trainings/`)
        .then(res => dispatch({
            type: GET_LAST_COMPLETED_TRAININGS,
            payload: res.data
        }))
        .catch(err => {
            throw err
        })
}

export const getUpcomingTrainings = (data) => (dispatch, getState) => {
    let token = getState().authentication.token
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    return axios.get(`${TRUEEFFECTS_URL}/api/v1/trainings/get_upcoming_trainings/`)
        .then(res => dispatch({
            type: GET_UPCOMING_TRAININGS,
            payload: res.data
        }))
        .catch(err => {
            throw err
        })
}