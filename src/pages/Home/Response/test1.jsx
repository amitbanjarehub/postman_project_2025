const convertToBase64 = (json, maxLength = 256) => {
  let hexOutput = "";

  json.forEach((item, index) => {
    let jsonString = JSON.stringify(item);
    let hexString = "";

    // Loop through each character of the string and convert it to hex
    for (let i = 0; i < jsonString.length; i++) {
      hexString +=
        jsonString
          .charCodeAt(i)
          .toString(16)
          .padStart(2, "0")
          .toUpperCase() + " ";
    }

    // Limit the length of the hexadecimal string
    if (hexString.length > maxLength) {
      hexString = hexString.substring(0, maxLength);
    }

    // Format the line number with leading zeros (for example, 00000000, 00000001, ...)
    let lineNumber = (index * jsonString.length)
      .toString(16)
      .padStart(8, "0")
      .toUpperCase();

    hexOutput += `${lineNumber}: ${hexString} \n`;
  });

  // Convert the hex string to base64 using btoa in browser
  const base64Encoded = btoa(hexOutput);  // btoa is a built-in browser function
  return base64Encoded;
};

const renderBase64 = () => {
  // Convert the data to base64
  const base64EncodedData = convertToBase64(json);

  return (
    <pre
      style={{
        background: "#f5f5f5",
        padding: "10px",
        fontFamily: "monospace",
        borderRadius: "5px",
        overflowX: "auto",
        fontSize: "12px",
      }}
    >
      {base64EncodedData}
    </pre>
  );
};
