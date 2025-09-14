import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import PageContainer from '../../components/container/PageContainer.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialOption = '';
const initialQuestion = {
  questionText: '',
  options: [initialOption, initialOption, initialOption, initialOption], // start with 4
  correctOptionIndex: null, // index of the correct option
  marks: 1,
};

const AddQuestions = () => {
  const [questions, setQuestions] = useState([{ ...initialQuestion }]);
  const [loading, setLoading] = useState(false);

  // Add a new empty question
  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { ...initialQuestion }]);
  };

  // Remove a question at index
  const handleRemoveQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // Update question text
  const handleQuestionTextChange = (val, index) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = val;
    setQuestions(newQuestions);
  };

  // Update marks
  const handleMarksChange = (val, index) => {
    const newQuestions = [...questions];
    newQuestions[index].marks = val;
    setQuestions(newQuestions);
  };

  // Update option text
  const handleOptionChange = (val, qIndex, optIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = val;
    setQuestions(newQuestions);
  };

  // Add option to a specific question
  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push(initialOption);
    setQuestions(newQuestions);
  };

  // Remove option from a specific question
  const handleRemoveOption = (qIndex, optIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length <= 2) {
      toast.error('Each question must have at least 2 options.');
      return;
    }
    newQuestions[qIndex].options.splice(optIndex, 1);

    // Adjust correctOptionIndex if needed
    if (
      newQuestions[qIndex].correctOptionIndex === optIndex ||
      newQuestions[qIndex].correctOptionIndex > newQuestions[qIndex].options.length - 1
    ) {
      newQuestions[qIndex].correctOptionIndex = null;
    } else if (newQuestions[qIndex].correctOptionIndex > optIndex) {
      newQuestions[qIndex].correctOptionIndex -= 1;
    }

    setQuestions(newQuestions);
  };

  // Set which option is correct for a question (radio button)
  const handleCorrectOptionChange = (qIndex, newIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOptionIndex = newIndex;
    setQuestions(newQuestions);
  };

  // Submit all questions to backend
  const handleSubmit = async () => {
    // Basic validation
    for (let q of questions) {
      if (!q.questionText.trim()) {
        toast.error('Please fill in all question texts');
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        toast.error('Please fill in all options');
        return;
      }
      if (q.correctOptionIndex === null) {
        toast.error('Please select the correct option for every question');
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        questions: questions.map((q) => ({
          examId: 'YOUR_EXAM_ID_HERE', // Replace with actual exam ID
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.options[q.correctOptionIndex],
          marks: Number(q.marks),
        })),
      };

      const { data } = await axios.post('/api/questions', payload, { withCredentials: true });

      toast.success(`${data.length} questions added successfully`);
      setQuestions([{ ...initialQuestion }]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add questions');
    }

    setLoading(false);
  };

  return (
    <PageContainer title="Add Questions" description="Add exam questions dynamically">
      <Card sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          Add Exam Questions
        </Typography>

        {questions.map((q, qIndex) => (
          <Box
            key={qIndex}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              p: 2,
              mb: 3,
              position: 'relative',
              backgroundColor: '#fafafa',
            }}
          >
            {questions.length > 1 && (
              <IconButton
                aria-label="remove question"
                color="error"
                onClick={() => handleRemoveQuestion(qIndex)}
                sx={{ position: 'absolute', top: 12, right: 12 }}
              >
                <RemoveCircle />
              </IconButton>
            )}

            <Stack spacing={2}>
              <TextField
                label={`Question ${qIndex + 1}`}
                fullWidth
                value={q.questionText}
                onChange={(e) => handleQuestionTextChange(e.target.value, qIndex)}
                multiline
                rows={2}
              />

              <FormLabel>Options</FormLabel>
              <RadioGroup
                value={q.correctOptionIndex !== null ? String(q.correctOptionIndex) : ''}
                onChange={(e) => handleCorrectOptionChange(qIndex, Number(e.target.value))}
              >
                {q.options.map((opt, optIndex) => (
                  <Stack key={optIndex} direction="row" alignItems="center" spacing={1} mb={1}>
                    <FormControlLabel
                      value={String(optIndex)}
                      control={<Radio />}
                      label={
                        <TextField
                          value={opt}
                          onChange={(e) => handleOptionChange(e.target.value, qIndex, optIndex)}
                          size="small"
                          sx={{ width: '300px' }}
                        />
                      }
                      sx={{ flexGrow: 1 }}
                    />
                    {q.options.length > 2 && (
                      <IconButton
                        aria-label="remove option"
                        color="error"
                        onClick={() => handleRemoveOption(qIndex, optIndex)}
                      >
                        <RemoveCircle />
                      </IconButton>
                    )}
                  </Stack>
                ))}
              </RadioGroup>

              <Button
                startIcon={<AddCircle />}
                variant="outlined"
                onClick={() => handleAddOption(qIndex)}
                size="small"
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Option
              </Button>

              <TextField
                label="Marks"
                type="number"
                value={q.marks}
                onChange={(e) => handleMarksChange(e.target.value, qIndex)}
                inputProps={{ min: 1 }}
                sx={{ width: 120 }}
              />
            </Stack>
          </Box>
        ))}

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button startIcon={<AddCircle />} onClick={handleAddQuestion} variant="outlined" disabled={loading}>
            Add Question
          </Button>

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Questions'}
          </Button>
        </Stack>
      </Card>
    </PageContainer>
  );
};

export default AddQuestions;
