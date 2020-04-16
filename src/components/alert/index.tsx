import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Error from "@material-ui/icons/Error";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";

const useStyles = makeStyles({
  alert: {
    position: "fixed",
    textAlign: "center",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  main: {
    width: "20rem",
    overflow: "hidden",
    borderRadius: "0.4rem",
    boxShadow: "0px 10px 30px 0px rgba(0,0,0,0.3)",
  },
  wrap: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
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
    marginTop: "1rem",
  },
  icon: {
    fontSize: "4rem",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "row",
    padding: "0 0.5rem 0.5rem",
  },
  button: {
    backgroundColor: "#fff",
    border: "none",
    padding: "0.7rem 0",
    textTransform: "uppercase",
    flex: 1,
    margin: "0.2rem",
    borderRadius: "0.2rem",
    fontWeight: "bolder",
  },
});

interface AlertProps {
  type?: "success" | "error" | "warning";
  title: string;
  content?: string;
  buttonName: string[];
  isOpen?: boolean;
  onClick: any;
}

function Alert(props: AlertProps) {
  const classes = useStyles();
  const {
    type = "success",
    title,
    content,
    onClick,
    buttonName,
    isOpen = false,
  } = props;
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  function renderIcon() {
    if (type === "success") return <ThumbUp className={classes.icon} />;
    if (type === "error") return <Error className={classes.icon} />;
    if (type === "warning") return <Warning className={classes.icon} />;
  }

  function renderButtons() {
    if (
      onClick &&
      buttonName &&
      buttonName.length >= 1 &&
      buttonName.length <= 2
    ) {
      const buttons = buttonName.map((index, i) => (
        <button key={index} onClick={onClick[i]} className={classes.button}>
          {buttonName[i]}
        </button>
      ));
      return buttons;
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, translateY: "-200%", translateX: "-50%" }}
            animate={{ opacity: 1, translateY: "-50%", translateX: "-50%" }}
            exit={{ opacity: 0, translateY: "-200%", translateX: "-50%" }}
            className={clsx(classes.alert)}
          >
            <div className={classes.main}>
              <div className={classes[type]}>
                <div className={classes.wrap}>
                  {renderIcon()}
                  <span className={classes.title}>{title}</span>
                  {content && <p>{content}</p>}
                </div>
                <div className={classes.buttonRow}>{renderButtons()}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Alert;
