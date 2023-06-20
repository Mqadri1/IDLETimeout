import { createElement, useState, useEffect, Fragment } from "react";
import CustomAlert from "./components/customAlert";
import { SignOut } from "./components/SignOut";
import "./ui/SessionTimeOutSave.css";
import Cookies from 'universal-cookie';

const onMouseMove = event => {
    try {
        document.addEventListener("mousemove", () => {
            event(true);
        });
    } catch (e) {
        console.error("Error on mouse move : " + e);
    }
};
const onKeyPressed = event => {
    try {
        document.addEventListener("keypress", () => {
            event(true);
        });
    } catch (e) {
        console.error("Error on key press : " + e);
    }
};
// this code is to show alert message to the end user if he is not idel in the system based on a timer. 
//there is an option to save the data based on call a microflow action!.
export default function SessionTimeOutSave(props) {

if (props.idleTimeout >= 1 &&  props.alertTimeout >=10)
{
    const cookies = new Cookies();
    let timeOut = props.idleTimeout * 60000;
    let popupTimeOut = props.alertTimeout * 1000;
    const [showPopup, setShowPopup] = useState(false);

    let timerId = null;
    let alertTimeOut = null;





    useEffect(() => {
        clearInterval(timerId);
        clearInterval(alertTimeOut);
        if (showPopup) {
            alertTimeOut = setInterval(() => {
                SignOut(props);
            }, popupTimeOut);

            // Clean up 
            return () => {
                clearInterval(timerId);
                clearTimeout(alertTimeOut)


            }
        }

    }, [showPopup]);

    useEffect(() => {
        timerChange();

        // Every time user move the mouse , it must clear the previous interval and set new one  .
        onMouseMove(() => {
            timerChange();
        });

        // Every time user pressed the mouse , it must clear the previous interval and set new one  .

        onKeyPressed(() => {
            timerChange();
        });

        // Clean up 
        return () => {
            clearInterval(timerId);
            clearTimeout(alertTimeOut)


        };
    }, []);



    const timerChange = () => {

        clearInterval(timerId);
        clearTimeout(alertTimeOut)
        cookies.set('expiredTime', Date.now() + timeOut, { path: '/' });


        let timer = setInterval(() => {
            if (!showPopup && (parseInt(cookies.get('expiredTime')) < Date.now())) {

                setShowPopup(true);
                clearInterval(timer)

            }
        }, timeOut);
        timerId = timer;
    }




    // This function for handling popup actions once he clicked on stay!  
    const handlePopup = check => {
        setShowPopup(check);
        clearTimeout(timerId)
        clearTimeout(alertTimeOut)
        timerChange();

   
    };

    // This is to render the result based on the ideltimer
    if (showPopup) {
        return (
            <CustomAlert
                popup={handlePopup}
                alertTitle={props.alertTitle}
                alertTimeout={props.alertTimeout}
                signOutButton={props.signOutButton}
                stayButton={props.stayButton}
            />
        );
    } else {
        return <Fragment />;
    }
}

else {
    console.error("make sure that the Timeout Clock >= 1 and the Alert Timer >=10 ")
     return <Fragment />;
}}