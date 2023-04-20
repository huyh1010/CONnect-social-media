import React from "react";
import styled from "@emotion/styled";
import { Box, Card, CardHeader, Link, Stack, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function ProfileSocialMedia({ profile }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const IconStyle = styled(Box)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  }));

  const SOCIAL_MEDIA = [
    {
      name: "Linkedin",
      icon: (
        <IconStyle color="#0077b5">
          <LinkedInIcon />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#3b5998">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#1DA1F2">
          <TwitterIcon />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#E1306C">
          <InstagramIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];
  return (
    <Card>
      <CardHeader title="Social" variant="h6" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIAL_MEDIA.map((app) => (
          <Stack direction="row" key={app.name} alignItems={"center"}>
            {app.icon}
            <Typography>
              {" "}
              <Link component={"span"} variant="subtitle2" color="text.primary">
                {app.href}
              </Link>
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialMedia;
