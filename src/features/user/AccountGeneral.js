import React, { useCallback } from "react";
import { FTextField, FormProvider } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FUploadAvatar from "../../components/form/FUploadAvatar";
import { fData } from "../../utils/numberFormat";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountGeneral() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    avatarUrl: user?.avatarUrl || "",
    coverUrl: user?.coverUrl || "",
    aboutMe: user?.aboutMe || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    company: user?.company || "",
    jobTitle: user?.jobTitle || "",
  };
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateUserSchema),
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <FUploadAvatar
              name="avatarUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  {" "}
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1,1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />
              <FTextField name="jobTitle" label="Job Title" />
              <FTextField name="company" label="Company" />
              <FTextField name="phoneNumber" label="Phone Number" />
              <FTextField name="address" label="Address" />
              <FTextField name="city" label="City" />
              <FTextField name="country" label="Country" />
            </Box>

            <Stack spacing={3} alignItems={"flex-end"} sx={{ mt: 3 }}>
              <FTextField name="coverUrl" label="Home Profile Cover Image" />
              <FTextField multiline rows={4} name="aboutMe" label="About Me" />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;
