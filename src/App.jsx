import { useState } from "react";
import axios from "axios";

import { Button, Text, TextField } from "@radix-ui/themes";

function App() {
  const [data, setData] = useState("");
  // eslint-disable-next-line no-unused-vars
  var [response, setResponse] = useState({});

  const upload = async () => {
    try {
      const formData = JSON.parse(data);
      await axios
        .post("http://localhost:3000/bfhl", formData)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
        })
        .catch((er) => console.log(er));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center items-center ">
      <div className="flex flex-col gap-y-3 w-80 md:w-96">
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
        <Button type="button" onClick={upload}>
          Upload
        </Button>
        <h1>Please check the console 😭</h1>
      </div>
    </div>
  );
}

export default App;
