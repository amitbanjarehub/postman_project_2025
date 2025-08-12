<Stack
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",  // This will space out the left and right stacks
    alignItems: "center",
    width: "100%",  // Ensure the container takes full width
  }}
>
  {/* Left Stack with FaLessThan */}
  <Stack
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <FaLessThan />
  </Stack>

  {/* Middle Stack (with Chips) */}
  <Stack
    sx={{
      margin: "5px",
      overflowX: "auto", // Enable horizontal scrolling if content overflows
      whiteSpace: "nowrap", // Prevent wrapping of items to the next line
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 1,  // This will ensure it takes up the remaining space
    }}
  >
    {topHeader.map((item) => (
      <Chip
        key={item.childRowId}
        label={`${item.fileMethod} - ${item.fileName}`} // Display fileMethod and fileName as label
        onDelete={() => handleDelete(item.childRowId)} // Handle delete action
        onClick={() => handlePostman(item)}
        sx={{ margin: "5px" }}
      />
    ))}
  </Stack>

  {/* Right Stack with FaGreaterThan */}
  <Stack
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <FaGreaterThan />
  </Stack>
</Stack>
