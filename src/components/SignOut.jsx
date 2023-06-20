import { createElement } from "react";
// this is the signout component that will trigger a microflow based on the class and then logout!
export function SignOut(props) {
    let message = "";

    try {
        let clase = document.getElementsByClassName(props.classID);
        message = "the information has been saved successfully";
        clase[0].click();
    } catch (error) {
        message = "the class is not used!";
    }

    mx.logout();

    return console.info(message);
}
