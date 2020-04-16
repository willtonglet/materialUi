import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";

const useStyles = makeStyles({
  modal: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 999,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  main: {
    backgroundColor: "#fff",
    maxHeight: "80vw",
    padding: "2rem",
    borderRadius: "0.4rem",
    boxShadow: "0px 10px 30px 0px rgba(0,0,0,0.3)",
    overflowY: "auto",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    fontWeight: 300,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    border: "none",
    backgroundColor: "transparent",
    padding: "1rem",
  },
  title: {
    fontSize: "1.6rem",
    display: "block",
    fontWeight: 700,
    marginBottom: "1.4rem",
  },
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  justify: {
    textAlign: "justify",
  },
  sm: {
    width: "30vw",
  },
  md: {
    width: "50vw",
  },
  lg: {
    width: "70vw",
  },
});

interface ModalProps {
  isOpen?: boolean;
  onClose?: any;
  children?: React.ReactNode;
  align?: "left" | "center" | "right" | "justify";
  size?: "sm" | "md" | "lg";
  title: string;
}

function Modal(props: ModalProps) {
  const classes = useStyles();
  const {
    onClose,
    title,
    isOpen = false,
    children,
    align = "left",
    size = "md",
  } = props;
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx(classes.modal)}
          >
            <div className={classes.overlay} onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, translateY: "-200%", translateX: "-50%" }}
              animate={{ opacity: 1, translateY: "-50%", translateX: "-50%" }}
              exit={{ opacity: 0, translateY: "-200%", translateX: "-50%" }}
              className={clsx(classes.main, classes[align], classes[size])}
            >
              <button className={classes.close} onClick={onClose}>
                <Close />
              </button>
              <span className={classes.title}>{title}</span>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Modal;
