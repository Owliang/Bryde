import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import FormComponents from "../FormComponents/FormComponents";
import { Form, useForm } from "../useForm";
import MyDialog from "../../components/MyDialog";

const useStyles = makeStyles({
  textMultiline: {
    width: "80%",
  },
});

const RatingForm = () => {
  const {
    values: ratingData,
    setValues: setRatingData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm({ star: 2.5, review: "" }, false);
  const [dialog, setDialog] = useState("");

  const classes = useStyles();

  const handleClose = () => {
    setDialog({ open: false });
  };

  const handleSubmit = () => {
    setDialog({
        title:
          "Thank you for your feedback",
        open: true,
        message:
          "Your rating and review for this coures is successfully submit, Thank you for your feedback."
    });
  };

  return (
    <div>
        <MyDialog
          title={dialog.title}
          open={dialog.open}
          handleClose={dialog.handleClose || handleClose}
          message={dialog.message}
          buttonOneRefTo={dialog.mainRefTo}
          buttonOneMessage={dialog.mainMessage}
          buttonTOneOnClick={dialog.mainOnClick}
          buttonTwoRefTo={dialog.optionRefTo}
          buttonTwoMessage={dialog.optionMessage}
          buttonTwoOnClick={dialog.optionOnClick}
          submessage={dialog.submessage}
        />
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <FormComponents.RatingStar
              star={ratingData.star}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Box>
              <FormComponents.TextInput
                multiline
                rows="4"
                label="Write Review for ths course"
                name="review"
                onChange={handleInputChange}
                value={ratingData.review}
              />
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <FormComponents.SimpleButton text="Submit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default RatingForm;
