// /C:/Users/LEOVO/Desktop/Code/SamCode/src/components/Loader.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./Loader.css";

export default function Loader() {
    const wrapperControls = useAnimation();
    const overlayControls = useAnimation();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            await wrapperControls.start({
                y: 160,
                scaleY: 0.85,
                scaleX: 1.15,
                transition: { duration: 0.55, ease: "easeIn" },
            });
            if (!mounted) return;

            await wrapperControls.start({
                y: -24,
                scaleY: 1.05,
                scaleX: 0.95,
                transition: { duration: 0.42, ease: "easeOut" },
            });
            if (!mounted) return;

            await wrapperControls.start({
                y: 0,
                scaleY: 1,
                scaleX: 1,
                transition: { duration: 0.28, ease: "easeInOut" },
            });
            if (!mounted) return;

            await new Promise((res) => setTimeout(res, 120));
            if (!mounted) return;

            await wrapperControls.start({
                scale: 60,
                borderRadius: "0%",
                transition: { duration: 0.7, ease: "easeInOut" },
            });
            if (!mounted) return;

            await overlayControls.start({
                opacity: 0,
                transition: { duration: 0.5, ease: "easeOut" },
            });
            if (!mounted) return;

            setVisible(false);
        })();

        return () => {
            mounted = false;
        };
    }, [wrapperControls, overlayControls]);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={overlayControls}
            aria-hidden="true"
            className="loader-overlay"
        >
            <motion.div
                animate={wrapperControls}
                initial={{ y: 0, scale: 1, scaleX: 1, scaleY: 1, borderRadius: "9999px" }}
                style={{
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transformOrigin: "center center",
                }}
            >
                <motion.div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "9999px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.45), 0 0 40px rgba(99,102,241,0.12)",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
