const Info = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={`font-semibold ${highlight ? "text-destructive" : ""}`}>
      {value}
    </p>
  </div>
);

export default Info;