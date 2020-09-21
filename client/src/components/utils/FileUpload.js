import React, { useState } from "react";
import fUp from "./FileUpload.module.css";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
function FileUpload(props) {
  const [Image, setImage] = useState({
    path: "",
  });
  const [Loading, setLoading] = useState(false);
  const onDrop = async (files) => {
    setLoading(true);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    await axios
      .post("http://localhost:3001/product/upload", formData, config)
      .then((response) => {
        if (response.data.success === true) {
          setImage({ path: response.data.fileName });
          props.refreshFunction(response.data.fileName);
          setLoading(false);
        } else {
          alert("Failed to save the image in server");
        }
      });
  };

  return (
    <div className={fUp.component}>
      <div className={fUp.fullarea}>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <PlusOutlined
                style={{
                  width: "150px",
                  height: "150px",
                  color: "grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "26px",
                }}
              />
            </div>
          )}
        </Dropzone>
        {!Loading ? (
          <div>
            <img
              className={fUp.image}
              src={`/imagenes/uploads/${Image.path}`}
              alt={` `}
              lazyload="true"
            />
          </div>
        ) : (
          <div className="alert alert-info">Cargando...</div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
