import { createElement } from "react";
import { SignOut } from "./SignOut";
import Swal from 'sweetalert2'
// this is a sweetalert package that will customize the popup alert you can learn more: https://sweetalert2.github.io/
export default function CustomAlert(props) {
    const alertPopup = () => {
        let timerInterval;
        Swal.fire({
            title: props.alertTitle,
            timerProgressBar: true,
            html: 'Auto logout in <b></b> second.',
            keydownListenerCapture: true,
            width: 600,
            timer: props.alertTimeout * 1000,

            didOpen: () => {
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft() / 1000;
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            },
            allowEscapeKey: false,
            showCancelButton: true,
            confirmButtonText: props.signOutButton,
            cancelButtonText: props.stayButton,
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                SignOut();

            } else {

                props.popup(false)

            }

        })
    }


    return <div>{alertPopup()}</div>

}