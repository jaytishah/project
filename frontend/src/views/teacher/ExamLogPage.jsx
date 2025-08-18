import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer.jsx';
import DashboardCard from '../../components/shared/DashboardCard.jsx';
import CheatingTable from './components/CheatingTable.jsx';

const ExamLogPage = () => {
  return (
    <PageContainer title="ExamLog Page" description="this is ExamLog page">
      <DashboardCard title="ExamLog Page">
        <Typography>This is a ExamLog page</Typography>
        <CheatingTable />
      </DashboardCard>
    </PageContainer>
  );
};

export default ExamLogPage;
