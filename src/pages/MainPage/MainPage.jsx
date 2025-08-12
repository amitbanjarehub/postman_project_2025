import React, { useState, useEffect } from "react";
import { Button, Divider, Stack, TextField } from "@mui/material";
import { BsCollection } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Column2 from "./Column2";
const MainPage = () => {
  const [col1Width, setCol1Width] = useState(50); // Initial width of Column 1 in percentage
  const [col2Width, setCol2Width] = useState(50); // Initial width of Column 2 in percentage
  const [isDragging, setIsDragging] = useState(false); // For detecting mouse drag
  const [startX, setStartX] = useState(0); // To store the initial mouse position when dragging starts

  const MIN_COL1_WIDTH = 16; // Set minimum width for Column 1 (e.g., 10%)
  const MIN_COL2_WIDTH = 39; // Set minimum width for Column 2 (e.g., 39%)

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      // Check if the left mouse button was clicked (button 0 is the left button)
      setIsDragging(true);
      setStartX(e.clientX); // Store the initial mouse position
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX; // Calculate how far the mouse has moved horizontally
      const newCol1Width = col1Width + (deltaX / window.innerWidth) * 100; // Adjust column 1 width based on the movement

      // Ensure columns' width stays within reasonable bounds (between MIN_COL1_WIDTH and 100 - MIN_COL2_WIDTH for Column 1)
      if (
        newCol1Width >= MIN_COL1_WIDTH &&
        newCol1Width <= 100 - MIN_COL2_WIDTH
      ) {
        setCol1Width(newCol1Width);
        setCol2Width(100 - newCol1Width); // Column 2 width will adjust automatically
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Stop resizing when mouse is released
  };

  useEffect(() => {
    // Add event listeners for mousemove and mouseup when dragging starts
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup event listeners when component is unmounted
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Stack sx={{ border: "1px solid #ddd", height: "94vh" }}>
      <Stack sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <Stack
          sx={{
            height: "100%",
            border: "1px solid blue",
            width: `${col1Width}%`,
            transition: "width 0.2s",
            backgroundColor: "#f6ebfc",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack sx={{ height: "5%", border: "1px solid grey" }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  height: "100%",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FaPlus />
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextField size="small" />
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineMoreHoriz />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              sx={{ height: "95%", display: "flex", flexDirection: "row" }}
            >
              gffgfghgh
            </Stack>
          </Stack>
        </Stack>

        <div
          style={{
            cursor: "ew-resize", // This changes the cursor to ⇔ when hovering between columns
            width: "2px",
            backgroundColor: "#ddd",
            height: "100%",
          }}
          onMouseDown={handleMouseDown} // Start the resizing process
        ></div>

        <Stack
          sx={{
            height: "100%",
            border: "1px solid green",
            width: `${col2Width}%`,
            transition: "width 0.2s",
            backgroundColor: "#f2fafc",
          }}
        >
          <Column2 />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MainPage;
