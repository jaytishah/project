import React from "react";
import { Box, Card, CardContent, Grid, Typography, Avatar, Stack, Chip } from "@mui/material";
import PageContainer from "../../components/container/PageContainer.jsx";
import { useSelector } from "react-redux";

const MyProfile = () => {
  // Adjust the fields according to your Redux auth structure
  const { userInfo } = useSelector((state) => state.auth);

  // Demo fallback fields if undefined
  const {
    name = "Student Name",
    studentId = "STU123456",
    standard = "12th Grade",
    subjects = ["Mathematics", "Physics", "English"],
    email = "student@example.com",
    phone = "9876543210",
    avatarUrl,
  } = userInfo || {};

  return (
    <PageContainer title="My Profile" description="Your personal details">
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: { xs: 2, md: 5 },
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(140, 74, 242, 0.2)",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
        elevation={9}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mb={3}
            sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          >
            <Avatar
              src={avatarUrl}
              alt={name}
              sx={{
                width: 72,
                height: 72,
                bgcolor: "#8C4AF2",
                fontWeight: 700,
                fontSize: 32,
              }}
            >
              {(name || "S").charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#8C4AF2" }}>
                {name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                ID: {studentId}
              </Typography>
            </Box>
          </Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Standard
              </Typography>
              <Typography variant="body1">{standard}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1">{email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1">{phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Subjects
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {subjects.length > 0 ? (
                  subjects.map((subject, idx) => (
                    <Chip
                      key={idx}
                      label={subject}
                      sx={{
                        bgcolor: "#8C4AF2",
                        color: "white",
                        mb: 1,
                        fontWeight: 600,
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    None
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default MyProfile;
