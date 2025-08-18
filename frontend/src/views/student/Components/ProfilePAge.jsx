import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Chip, Stack } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer.jsx';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  // Assume student info is stored in Redux auth slice userInfo
  const { userInfo } = useSelector((state) => state.auth);

  // Example structure - adjust fields according to your userInfo shape
  const {
    name,
    studentId,
    standard,
    subjects = [],
    email,
    phone,
    // add more fields as needed
  } = userInfo || {};

  return (
    <PageContainer title="Student Profile" description="User profile page">
      <Card
        sx={{
          maxWidth: 700,
          margin: 'auto',
          mt: 5,
          borderRadius: 3,
          boxShadow: '0 4px 15px rgba(140, 74, 242, 0.3)',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
        elevation={9}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ mb: 3, color: '#8C4AF2', fontWeight: 'bold' }}
          >
            Profile Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Full Name
              </Typography>
              <Typography variant="h6">{name || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Student ID
              </Typography>
              <Typography variant="h6">{studentId || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Standard
              </Typography>
              <Typography variant="h6">{standard || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="h6">{email || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Phone
              </Typography>
              <Typography variant="h6">{phone || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Subjects
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <Chip
                      sx={{
                        bgcolor: '#8C4AF2',
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 1,
                      }}
                      label={subject}
                      key={index}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No subjects assigned
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

export default ProfilePage;
