import React from "react";

import { Grid, Stack } from "@mui/material";
import ProfileScoreCard from "./ProfileScoreCard";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialMedia from "./ProfileSocialMedia";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import useAuth from "../../hooks/useAuth";

function Profile({ profile }) {
  const { user } = useAuth();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScoreCard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialMedia profile={profile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user._id === profile._id && <PostForm />}
          {<PostList userId={profile._id} />}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
