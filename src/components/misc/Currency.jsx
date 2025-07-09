export default function Currency({ value, minimumFractionDigits = 2 }) {
  const formatter = new Intl.NumberFormat("EN-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits, // when this
  });

  return <>{formatter.format(value)}</>;
}
