import { useState } from "react";
import axios from "axios";

import { Button, Flex, Text, TextField } from "@radix-ui/themes";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");

  const upload = () => {
    const formData = new FormData();

    formData.append("file_b64", file);
    formData.append("data", data);

    console.log(formData);

    axios
      .post("http://localhost:3000/bfhl", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er));
  };

  return (
    <div>
      <TextField.Root
        placeholder="data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <Flex>
        <Text>Upload your file</Text>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </Flex>
      <Button type="button" onClick={upload}>
        Upload
      </Button>
    </div>
  );
}

export default App;
