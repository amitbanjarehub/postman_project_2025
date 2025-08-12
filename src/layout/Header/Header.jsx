import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineBell } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
const Header = () => {
  return (
    <Stack
      sx={{
        height: { xl: "48px", lg: "48px", md: "48px", sm: "48px" },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ddd",
          backgroundColor: "#F9F9F9",
          height: "100%",
        }}
      >
        {/* Left side */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            gap: 1,
          }}
        >
          <Stack
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "12px",
              marginRight: "12px",
            }}
          >
            <RxHamburgerMenu />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack>
              <FaArrowLeft />
            </Stack>
            <Stack>
              <FaArrowRight />
            </Stack>
            <Stack>
              <Typography>Home</Typography>
            </Stack>
            <Stack>
              <Typography>Workspaces</Typography>
            </Stack>
            <Stack>
              <Typography>API Network</Typography>
            </Stack>
          </Stack>
        </Stack>
        {/* center side */}
        <Stack
          sx={{
            width: { xl: "10%" },
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              border: "1px solid #ddd",
              display: "flex",
              flexDirection: "row",
              height: "70%",
              borderRadius: "8px",
              gap: 1,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "12px",
              }}
            >
              <IoIosSearch />
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "12px",
              }}
            >
              <Typography>Search Postman</Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* right side */}
        <Stack
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              height: "70%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "12px",
              gap: 2,
            }}
          >
            <Stack>
              <Button
                variant="contained"
                startIcon={<MdPersonAddAlt1 style={{ color: "white" }} />} // Add the icon here
                size="small"
                sx={{ textTransform: "none" }}
              >
                Invite
              </Button>
            </Stack>
            <Stack>
              <IoSettingsOutline style={{ fontSize: "24px" }} />
            </Stack>
            <Stack>
              <AiOutlineBell style={{ fontSize: "24px" }} />
            </Stack>
            <Stack>
              <MdManageAccounts style={{ fontSize: "24px" }} />
            </Stack>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontSize: { xl: "16px" } }}>Upgrade</Typography>
              <IoIosArrowDown />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
