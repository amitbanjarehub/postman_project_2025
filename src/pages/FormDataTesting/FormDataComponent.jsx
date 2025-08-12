// import React, { useState } from "react";
// import axios from "axios";

// const FormDataComponent = () => {
//   const [imgFile, setImgFile] = useState(null);
//   const [rawData, setRawData] = useState({ name: "ami", age: "12" });

//   const handleFileChange = (e) => {
//     setImgFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("imgFile", imgFile);
//     formData.append("rawData", JSON.stringify(rawData));

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/form-data",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Response:", response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FormDataComponent;
import React, { useState } from "react";
import axios from "axios";

const FormDataComponent = () => {
  const [imgFiles, setImgFiles] = useState([]);
  const [rawData, setRawData] = useState({
    name: "amit",
    age: "76",
    // Any other additional key-value data you want to send
  });

  const handleFileChange = (e) => {
    setImgFiles(e.target.files); // Multiple files selection
  };
//   console.log("imgFiles:------------->>>", imgFiles);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Appending multiple files
    Array.from(imgFiles).forEach((file) => {
      formData.append("imgFiles", file); // 'imgFiles' key for each file
    });

    // Appending JSON data
    formData.append("rawData", JSON.stringify(rawData)); // rawData as JSON string

    try {
     
      const response = await axios.post(
        "http://localhost:5000/api/form-data2",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} multiple />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDataComponent;
