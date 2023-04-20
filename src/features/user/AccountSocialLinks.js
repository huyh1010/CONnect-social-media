import React from "react";
import useAuth from "../../hooks/useAuth";
import { Card, InputAdornment, Stack } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "./userSlice";

const SOCIAL_TABS = [
  { value: "facebookLink", icon: <FacebookIcon sx={{ fontSize: 30 }} /> },
  { value: "instagramLink", icon: <InstagramIcon sx={{ fontSize: 30 }} /> },
  { value: "linkedinLink", icon: <LinkedInIcon sx={{ fontSize: 30 }} /> },
  { value: "twitterLink", icon: <TwitterIcon sx={{ fontSize: 30 }} /> },
];

function AccountSocialLinks() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    name: user?.name,
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    linkedinLink: user?.linkedinLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const dispatch = useDispatch();
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems={"flex-end"}>
          {SOCIAL_TABS.map((link) => (
            <FTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocialLinks;
