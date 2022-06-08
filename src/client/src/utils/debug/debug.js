import { keys, union } from "lodash";
import { useRef } from "react";

export const useChangedValues = (props) => {
  const prevProps = useRef({});
  const propsKeys = union(keys(prevProps), keys(props));

  const diffs = propsKeys.reduce((acc, key) => {
    if (prevProps.current[key] !== props[key]) {
      acc[key] = [prevProps.current[key], props[key]];
    }
    return acc;
  }, {});

  Object.entries(diffs).forEach(([key, values]) => {
    console.log(`Prop changed ${key}`, values);
  });

  prevProps.current = props;
};
