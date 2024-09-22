import { useState } from "react";
import axios from "axios";
import { Select } from "antd";

import { Button, Text, TextField } from "@radix-ui/themes";

const options = [
  { label: "Alphabets", value: "alphabets" },
  { label: "Numbers", value: "numbers" },
  {
    label: "Highest Lowercase Alphabet",
    value: "highest_lowercase_alphabet"
  }
];

function App() {
  const [data, setData] = useState("");
  var [response, setResponse] = useState({});
  var [filters, setFilters] = useState([
    "alphabets",
    "numbers",
    "highest_lowercase_alphabet"
  ]);

  const upload = async () => {
    try {
      const formData = JSON.parse(data);
      await axios
        .post("https://bfhl-backend-htmo.onrender.com/bfhl", formData)
        .then((res) => {
          console.log(res.data);
          setResponse(res.data);
        })
        .catch((er) => console.log(er));
    } catch (error) {
      console.error(error);
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
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select your filters"
          defaultValue={["alphabets", "numbers", "highest_lowercase_alphabet"]}
          options={options}
          onChange={(value) => {
            console.log(filters);
            setFilters(value);
          }}
        />
        {Object.keys(response).length > 0 && (
          <>
            {filters.map((filter) => (
              <div key={filter} className="flex gap-x-1">
                <Text size={4} weight={"bold"}>
                  {" "}
                  {filter}
                  {": "}
                </Text>
                {response[filter].map((element, i) => (
                  <div key={i}>
                    <Text size={4} weight={"bold"}>
                      {element}
                    </Text>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
