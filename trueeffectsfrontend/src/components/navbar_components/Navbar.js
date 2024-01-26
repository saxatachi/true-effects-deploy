import "../../new_sass/navbar.scss"
import React, {useState} from "react";
import {faDumbbell} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {
    handleMoveToCreateTraining,
    handleMovetoDimensions,
    handleMovetoGoals,
    handleMoveToMobileCreateTraining,
    handleMovetoMobileDimensions,
    handleMoveToMobileGoals,
    handleMoveToMobileScheduler,
    handleMoveToMobileSettings,
    handleMoveToScheduler,
    handleMovetoSettings
} from "../helpers/history_helpers";
import {useHistory} from "react-router-dom";

const Navbar = () => {
    const history = useHistory()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <nav className="nav_bar">
            <div className="nav_bar__toggle" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}><FontAwesomeIcon
                icon={faBars}/></div>
            <div className="nav_bar__logo"><FontAwesomeIcon icon={faDumbbell}/>TrueEffects</div>
            <ul className="nav_bar__desktop">
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToScheduler(history)}><button className="nav_bar__button">Kalendarz treningów</button></li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMoveToCreateTraining(history)}><button className="nav_bar__button">Kreator treningu</button></li>
                <li className="nav_bar__element nav_bar__desktop__element" onClick={() => handleMovetoGoals(history)}>
                    <button className="nav_bar__button">Cele</button></li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMovetoDimensions(history)}><button className="nav_bar__button">Pomiary</button></li>
                <li className="nav_bar__element nav_bar__desktop__element"
                    onClick={() => handleMovetoSettings(history)}><button className="nav_bar__button">Ustawienia</button></li>
            </ul>
            <ul className="nav_bar__mobile" style={{display: isMobileNavOpen ? 'flex' : 'none'}}>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileScheduler(history, isMobileNavOpen, setIsMobileNavOpen)}><button className="nav_bar__button">Kalendarz
                    treningów</button></li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileCreateTraining(history, isMobileNavOpen, setIsMobileNavOpen)}><button className="nav_bar__button">Kreator
                    treningu</button></li>
                <li className="nav_bar__element nav_bar__mobile__element" onClick={() => {
                    handleMoveToMobileGoals(history, isMobileNavOpen, setIsMobileNavOpen)
                }}><button className="nav_bar__button">Cele</button></li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMovetoMobileDimensions(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Pomiary</button></li>
                <li className="nav_bar__element nav_bar__mobile__element"
                    onClick={() => handleMoveToMobileSettings(history, isMobileNavOpen, setIsMobileNavOpen)}>
                    <button className="nav_bar__button">Ustawienia</button></li>
            </ul>
        </nav>
    )
}

export default Navbar;