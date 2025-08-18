import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer.jsx';
import DashboardCard from '../../components/shared/DashboardCard.jsx';
import AddQuestionForm from './components/AddQuestionForm.jsx';

const AddQuestions = () => {
  return (
    <PageContainer title="Add Questions Page" description="this is Add Questions page">
      <DashboardCard title="Add Questions Page">
        <Typography>This is a Add Questions page</Typography>
        <AddQuestionForm />
      </DashboardCard>
    </PageContainer>
  );
};

export default AddQuestions;
