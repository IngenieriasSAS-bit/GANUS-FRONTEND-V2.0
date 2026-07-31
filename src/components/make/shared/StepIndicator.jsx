export default function StepIndicator({
    steps = [],
    currentStep = 0,
}) {

    return (

        <div className="step-indicator">

            {steps.map((step, index) => (

                <div
                    key={step}
                    className={`step-item ${
                        index === currentStep
                            ? "active"
                            : index < currentStep
                            ? "completed"
                            : ""
                    }`}
                >

                    <div className="step-circle">

                        {index + 1}

                    </div>

                    <span>

                        {step}

                    </span>

                </div>

            ))}

        </div>

    );

}