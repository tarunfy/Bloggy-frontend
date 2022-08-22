import { FormControl, InputGroup, Button } from "@chakra-ui/react";

import { useRef } from "react";

const FileUpload = ({ name, acceptedFileTypes, text, setCoverImage }) => {
  const handleCoverImage = (e) => {
    if (e.target.files[0].type.includes("image")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log("errrororrororrooror man");
      return;
    }
  };

  const inputRef = useRef();

  return (
    <FormControl className="!w-fit">
      <InputGroup className="!w-fit">
        <input
          type="file"
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          style={{ display: "none" }}
          onChange={(e) => handleCoverImage(e)}
        ></input>
        <Button
          variant="outline"
          className="!w-fit"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          {text}
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default FileUpload;
