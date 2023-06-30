import Layout1 from "@/layout/layout1";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ToastContext } from "@/context/toast";
import { useRouter } from "next/router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CreatePlot = () => {
  const { setToast } = React.useContext(ToastContext);
  const [resultDate, setResultDate] = React.useState();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      const name = data.get("name");
      const description = data.get("description");
      const startingBid = data.get("startingbid");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}plot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            startingBid,
            resultDate: new Date(resultDate)
          }),
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setToast("Plot created successfully");
        router.push("/dashboard");
      } else {
        setToast(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout1 title="Create plot">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
        width="50%"
        margin="auto"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              autoComplete="description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="startingbid"
              label="Starting bid amount"
              type="number"
              id="startingbid"
              autoComplete="startingbid"
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Bidding end date"
                value={resultDate}
                onChange={(newValue) => setResultDate(newValue)}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Plot
        </Button>
      </Box>
    </Layout1>
  );
};

export default CreatePlot;
