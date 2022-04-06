import PropTypes from "prop-types";
import React, { useState } from "react";
import Select from "react-select";
import { z } from "zod";

import Http from "../../services/Http";
import { getFormValues } from "../../utils/form/form";
import FormError from "../Login/steps/Form/FormError";
import FormInput from "../Login/steps/Form/FormInput";
import FormSubmit from "../Login/steps/Form/FormSubmit";
import StepForm from "../Login/steps/Form/StepForm";

const submitForm = async (data) => {
  const response = await Http.post("/createAccount", data);

  return response.data;
};

const schema = z.object({
  email: z.string().email(),
  structure: z.string(),
});

const validStructures = [
  "DDETSPP03",
  "DDETSPP04",
  "DDETSPP05",
  "DDETSPP07",
  "DDETSPP08",
  "DDETSPP09",
  "DDETSPP10",
  "DDETSPP11",
  "DDETSPP12",
  "DDETSPP16",
  "DDETSPP18",
  "DDETSPP19",
  "DDETSPP2A",
  "DDETSPP2B",
  "DDETSPP23",
  "DDETSPP24",
  "DDETSPP25",
  "DDETSPP28",
  "DDETSPP32",
  "DDETSPP36",
  "DDETSPP39",
  "DDETSPP40",
  "DDETSPP41",
  "DDETSPP43",
  "DDETSPP45",
  "DDETSPP46",
  "DDETSPP48",
  "DDETSPP51",
  "DDETSPP52",
  "DDETSPP53",
  "DDETSPP55",
  "DDETSPP58",
  "DDETSPP61",
  "DDETSPP65",
  "DDETSPP68",
  "DDETSPP70",
  "DDETSPP73",
  "DDETSPP79",
  "DDETSPP81",
  "DDETSPP82",
  "DDETSPP87",
  "DDETSPP88",
  "DDETSPP89",
  "DDETSPP90",
  "DDETS01",
  "DDETS02",
  "DDETS06",
  "DDETS13",
  "DDETS14",
  "DDETS15",
  "DDETS17",
  "DDETS21",
  "DDETS22",
  "DDETS26",
  "DDETS27",
  "DDETS29",
  "DDETS30",
  "DDETS31",
  "DDETS33",
  "DDETS34",
  "DDETS35",
  "DDETS37",
  "DDETS38",
  "DDETS42",
  "DDETS44",
  "DDETS45",
  "DDETS49",
  "DDETS50",
  "DDETS54",
  "DDETS56",
  "DDETS57",
  "DDETS59",
  "DDETS60",
  "DDETS62",
  "DDETS63",
  "DDETS64",
  "DDETS66",
  "DDETS67",
  "DDETS69",
  "DDETS71",
  "DDETS72",
  "DDETS74",
  "DDETS76",
  "DDETS77",
  "DDETS78",
  "DDETS80",
  "DDETS83",
  "DDETS84",
  "DDETS85",
  "DDETS86",
  "DDETS91",
  "DDETS95",
]
  .map((value) => ({
    label: value,
    value,
  }))
  .concat([
    {
      label: "Autre",
      value: "autre",
    },
  ]);

const hasErrors = (errors) => Object.keys(errors).length > 0;

const errorsMessageMap = {
  "Invalid email": "Email invalide",
};

const translateErrorMessages = (error) =>
  (error || []).reduce((acc, { path, message }) => {
    acc[path] = errorsMessageMap[message] || message;
    return acc;
  }, {});

const validateFormData = (data) => schema.safeParse(data);

const RequestAccessForm = ({ onSuccess }) => {
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const { error } = validateFormData(data);

    return translateErrorMessages(error);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const data = getFormValues(event.target);

    const submitErrors = validate(data);
    setErrors(submitErrors);

    if (!hasErrors(submitErrors)) {
      const { success, error } = await submitForm(data);

      if (!success) {
        setErrors(error);
      } else if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <StepForm onSubmit={onSubmit}>
      {hasErrors(errors) && (
        <FormError errorMessage="Une erreur s'est produite" />
      )}
      <FormInput label="Email" name="email" type="email" required={true} />
      <FormInput
        label="Structure"
        name="structure"
        type="text"
        input={({ name }) => (
          <Select
            id={name}
            name={name}
            options={validStructures}
            styles={{
              container: (provided) => ({ ...provided, width: "100%" }),
            }}
          />
        )}
      />
      <FormSubmit label="Demander l'accès" />
    </StepForm>
  );
};

RequestAccessForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default RequestAccessForm;
