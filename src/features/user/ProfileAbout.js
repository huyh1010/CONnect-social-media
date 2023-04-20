import { Card, CardHeader, Box, Stack, Typography, Link } from "@mui/material";
import React from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import styled from "@emotion/styled";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";

function ProfileAbout({ profile }) {
  const { city, email, jobTitle, aboutMe, country } = profile;

  const IconStyle = styled(Box)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  }));
  return (
    <Card>
      <CardHeader title="About" variant="h6" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{aboutMe}</Typography>

        <Stack direction={"row"}>
          <IconStyle>
            <PinDropIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component={"span"} variant="subtitle2" color="text.primary">
              {city} {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction={"row"}>
          <IconStyle>
            <EmailIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component={"span"} variant="subtitle2" color="text.primary">
              {email}
            </Link>
          </Typography>
        </Stack>

        <Stack direction={"row"}>
          <IconStyle>
            <WorkIcon />
          </IconStyle>
          <Typography variant="body2">
            <Link component={"span"} variant="subtitle2" color="text.primary">
              {jobTitle}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;
