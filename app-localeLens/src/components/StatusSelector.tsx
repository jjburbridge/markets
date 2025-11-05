import { Button, Grid } from "@sanity/ui";
import { useApp } from "../contexts/AppContext";

const STATUSES = ["all", "untranslated", "partially-translated", "fully-translated"] as const;

const StatusSelector = () => {
  const { status, setStatus } = useApp();
  return (
    <Grid columns={[2, 2, 2, 4]} gap={1}>
      {STATUSES.map((statusOption) => (
        <Button
          key={statusOption}
          mode={statusOption === status ? "default" : "ghost"}
          onClick={() => setStatus(statusOption)}
          text={statusOption}
        />
      ))}
    </Grid>
  );
};

export default StatusSelector;
