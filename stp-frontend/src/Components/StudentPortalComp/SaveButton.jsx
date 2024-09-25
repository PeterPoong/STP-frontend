// src/SaveButton.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Spinner Component for Loading Animation
const Spinner = () => (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 50 50"
      style={{ originX: '25px', originY: '25px' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <motion.circle
        cx="25"
        cy="25"
        r="20"
        stroke="#fff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0.2 }}
        animate={{ pathLength: 1 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </motion.svg>
  );

const SaveButton = ({ onSave }) => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'fail'

  const handleClick = async () => {
    if (status === "idle") {
      setStatus("loading");
      const loadingDuration = 1000; 
      try {
        const [result] = await Promise.all([
            onSave(),
            new Promise(resolve => setTimeout(resolve, loadingDuration))
          ]);
        if (result && result.success) {
          setStatus("success");
        } else {
          setStatus("fail");
        }
      } catch (error) {
        setStatus("fail");
      }

      // Revert back to idle after 2 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 1000);
    }
  };

  // Define button variants for animation
  const variants = {
    idle: {
      backgroundColor: "#B71A18",
      transition: { duration: 0.5 },
    },
    loading: {
      backgroundColor: "#B71A18",
      transition: { duration: 0.5 },
    },
    success: {
      backgroundColor: "#4CAF50",
      transition: { duration: 0.5 },
    },
    fail: {
      backgroundColor: "#F44336", // Red for failure
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.button
      onClick={handleClick}
      variants={variants}
      animate={status}
      initial="idle"
      
      whileHover={{backgroundColor:"white",border: `1px solid #B71A18`,color:"#B71A18",scale: status !== "loading" ? 1.05 : 1 }}
      whileTap={{ scale: status !== "loading" ? 0.95 : 1 }}
      disabled={status === "loading"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.125rem 4.125rem",
        border: "none",
        borderRadius: "9999px", // Fully rounded pill
        color: "#FFFFFF",
        fontSize: "1.125rem",
        cursor: status === "loading" ? "not-allowed" : "pointer",
        outline: "none",
        opacity: status === "loading" ? 0.8 : 1,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            Save
          </motion.span>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Spinner />
            <span style={{ marginLeft: "8px" }}>Saving...</span>
          </motion.div>
        )}

        {status === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            Saved!
          </motion.span>
        )}

        {status === "fail" && (
          <motion.span
            key="fail"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            Failed
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SaveButton;
