import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { motion, AnimatePresence } from "framer-motion";

const useStyles = makeStyles({
  wrap: {
    position: "relative",
    display: "inline-block",
  },
  tooltip: {
    padding: "3px 5px",
    borderRadius: "5px",
    position: "absolute",
    fontSize: "10px",
    width: "max-content",
    pointerEvents: "none",
  },
  primary: {
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "rgba(255,255,255,0.8)",
    color: "#000",
  },
  left: {
    right: "100%",
    top: "50%",
    transform: "translateY(-50%)",
  },
  top: {
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  right: {
    left: "100%",
    top: "50%",
    transform: "translateY(-50%)",
  },
  bottom: {
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
  },
});

interface TooltipProps {
  position?: "left" | "top" | "right" | "bottom";
  background?: "primary" | "secondary";
  title: string;
  children: React.ReactNode;
}

function Tooltip(props: TooltipProps) {
  const {
    position = "bottom",
    background = "primary",
    title,
    children,
  } = props;
  const classes = useStyles();
  const [open, setIsOpen] = useState(false);

  const renderProps = clsx(
    classes.tooltip,
    classes[background],
    classes[position]
  );

  return (
    <div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={classes.wrap}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={renderProps}
          >
            {title}
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Tooltip;
