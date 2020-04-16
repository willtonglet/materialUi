import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Close from "@material-ui/icons/Close";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Error from "@material-ui/icons/Error";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";

const useStyles = makeStyles({
  toaster: {
    position: "fixed",
    textAlign: "center",
    left: "2%",
    bottom: "2%",
  },
  main: {
    width: "22rem",
    overflow: "hidden",
    borderRadius: "0.4rem",
    boxShadow: "0px 10px 30px 0px rgba(0,0,0,0.3)",
    display: "flex",
    textAlign: "left",
    padding: "0.3rem",
    alignItems: "center",
  },
  success: {
    backgroundColor: "#8bc34a",
    color: "#fff",
  },
  warning: {
    backgroundColor: "#ffeb3b",
    color: "#000",
  },
  error: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  title: {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 500,
    flex: 10,
    marginLeft: "0.3rem",
  },
  icon: {
    fontSize: "1.4rem",
    flex: 1,
  },
  close: {
    backgroundColor: "transparent",
    border: "none",
    flex: 1,
    color: "#fff",
    marginTop: "0.2rem",
    padding: 0,
    width: "1rem",
  },
});

interface ToasterProps {
  type?: "success" | "error" | "warning";
  title: string;
  isOpen?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  time?: number;
}

function Toaster(props: ToasterProps) {
  const classes = useStyles();
  const { type = "success", title, onClick, isOpen = false, time } = props;
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
    if (time && isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(!isOpen);
      }, time);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClick, time]);

  function renderIcon() {
    if (type === "success") return <ThumbUp className={classes.icon} />;
    if (type === "error") return <Error className={classes.icon} />;
    if (type === "warning") return <Warning className={classes.icon} />;
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, translateY: "50%" }}
            animate={{ opacity: 1, translateY: "0%" }}
            exit={{ opacity: 0, translateY: "50%" }}
            className={clsx(classes.toaster)}
          >
            <div className={clsx(classes.main, classes[type])}>
              {renderIcon()}
              <span className={classes.title}>{title}</span>
              <button className={classes.close} onClick={onClick}>
                <Close />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Toaster;
