import { useState } from "react"

export default function useMultiStepForm() {
    const [step, setStep] = useState(0);

    const next = () => {
        setStep(step => step + 1);
    };

    const prev = () => {
        setStep(step => step - 1);
    };

    const setCurrentStep = step => {
        setStep(step);
    };

    return {
        currentStep: step,
        setCurrentStep,
        next,
        prev
    }
}