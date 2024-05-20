import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const handleNext = () => {
        setStep(2);
    };

    const pageVariants = {
        initial: { x: "100%" },
        enter: { x: 0, transition: { duration: 0.5 } },
        exit: { x: "-100%", transition: { duration: 0.5 } },
    };

    return (
        <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "100vh" }}>
            {step === 1 && (
                <motion.div
                    key="step1"
                    initial="enter"
                    animate="enter"
                    exit="exit"
                    variants={pageVariants}
                    style={{ position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                >
                    <input type="text" placeholder="Enter your name" style={{ padding: "10px", fontSize: "16px", marginBottom: "20px" }} />
                    <button onClick={handleNext} style={{ padding: "10px 20px", fontSize: "16px" }}>다음</button>
                </motion.div>
            )}
            {step === 2 && (
                <motion.div
                    key="step2"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={pageVariants}
                    style={{ position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}
                >
                    환영합니다!
                </motion.div>
            )}
        </div>
    );
}
