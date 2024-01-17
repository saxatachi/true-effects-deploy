import {Route} from 'react-router-dom';
import React, {useEffect} from 'react';
import Homepage from './Homepage';
import AddGoals from './AddGoals';
import {connect} from 'react-redux';
import DisplayMeasurements from './DisplayMeasurements'
import AddMeasurements from './AddMeasurements';
import AddMeasurementsSummary from './AddMeasurementsSummary';
import Settings from "./main_components/Settings";
import {loadToken, postLogoutAuth} from "../redux/actions/authenticationActions";
import {useAuth} from "./hooks";
import Scheduler from "./main_components/Scheduler";
import Trainingv2 from "./main_components/Trainingv2";
import ModifyTrainingv2 from "./main_components/ModifyTrainingv2";
import Navbar from "./navbar_components/Navbar";
import Dimensions from "./goals_and_dimensions_components/Dimensions";
import Goals from "./goals_and_dimensions_components/Goals";
import CreateTraining from "./main_components/CreateTraining";
import {
    getCompletedGoals,
    getDimensionConfiguration,
    getDimensionConfigurationForCompare,
    getDimensions,
    getExercises,
    getGoals,
    getGoalsToAchieve,
    getMeasurements,
    getSingleTraining,
    getTrainings,
    getUserDimensionsForCreate
} from '../redux/actions/trainingActions';
import '../sass/defaultcontainer.scss';
// import {loadToken, postLogoutAuth} from '../redux/actions/authenticationActions';


const DefaultContainer = (props) => {
    const {} = useAuth(props.token, props.loadToken, props.postLogoutAuth, props.history)
    useEffect(() => {
        // if (props.token == null) {
        //     props.history.push('/login')
        // }
        if (props.token) {
            props.getDimensionConfiguration();
            props.getDimensions();
            props.getUserDimensionsForCreate();
            props.getDimensionConfigurationForCompare();
            props.getTrainings();
            props.getSingleTraining(1);
            props.getGoalsToAchieve();
            props.getCompletedGoals();

        }
    }, [props.token])

    return (
        <>
            <Navbar/>
            {/*<UpperNavbar/>*/}
            {/*<SideNavbar/>*/}
            {/*<div className="container_default">*/}
            {/*{props.loadedtrainings && props.loadedgoals && props.loadedmeasurements && props.loadedexercises ? */}
            <Route exact path="/" component={Homepage}/>
            <Route path="/addmeasurements" component={AddMeasurements}/>
            <Route path="/displaymeasurements" component={DisplayMeasurements}/>
            <Route path="/measurementsummary" component={AddMeasurementsSummary}/>
            <Route path="/addgoals" component={AddGoals}/>
            {/*<Route path="/goals_and_dimensions" component={GoalsAndDimensions}/>*/}
            <Route path="/goals" component={Goals}/>
            <Route path="/dimensions" component={Dimensions}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/scheduler" component={Scheduler}/>
            <Route path="/training" component={Trainingv2}/>
            <Route path="/modify_training" component={ModifyTrainingv2}/>
            <Route path="/create_training" component={CreateTraining}/>

            {/*// : <BoxLoading />}*/}
            {/*</div>*/}

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.authentication.token,
        loadedtrainings: state.training.loadedtrainings,
        loadedmeasurements: state.training.loadedmeasurements,
        loadedgoals: state.training.loadedgoals,
        loadedexercises: state.training.loadedexercises
    }
}

export default connect(mapStateToProps, {
    getDimensionConfiguration,
    getDimensions,
    getGoalsToAchieve,
    getCompletedGoals,
    getUserDimensionsForCreate,
    getDimensionConfigurationForCompare,
    getSingleTraining,
    getMeasurements,
    getTrainings,
    getGoals,
    getExercises,
    postLogoutAuth,
    loadToken,

})(DefaultContainer);