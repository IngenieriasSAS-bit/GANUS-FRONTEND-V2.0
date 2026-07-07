import "./PrimaryButton.css";

export default function PrimaryButton({

    children,

    onClick

}){

    return(

        <button

            className="primary-button"

            onClick={onClick}

        >

            {children}

        </button>

    )

}