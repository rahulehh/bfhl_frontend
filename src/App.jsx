import { useState } from "react";
import axios from "axios";

import { Button, Flex, Text, TextField } from "@radix-ui/themes";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");

  const upload = async () => {
    let formData = new FormData();

    formData.append("file_b64", file);
    formData.append("data", data);

    console.log(formData.get("file_b64"));
    console.log(formData.get("data"));

    await axios
      .post("http://localhost:3000/bfhl", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="flex flex-col gap-y-3">
        <div>
          <Text size={4} weight={"bold"}>
            API Input
          </Text>
          <TextField.Root
            placeholder={`data (ex: "{"data": ["B", "13", "a", "z"]}")`}
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <Flex>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Flex>
        <Button type="button" onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default App;
