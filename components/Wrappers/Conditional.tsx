interface ConditionalProps {
  condition: boolean;
  trueRender: JSX.Element;
  falseRender?: JSX.Element;
}

export const Conditional = (props: ConditionalProps) => {
  const { condition, trueRender, falseRender = null } = props;

  if (condition) return trueRender;
  return falseRender;
};
