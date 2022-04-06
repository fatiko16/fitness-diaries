import React, { useState } from "react";

function useValidate(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const isInvalid = value === "";
  return { value, setValue, isInvalid };
}

export default useValidate;
