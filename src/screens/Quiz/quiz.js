import React, { useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import API from '../../api/config';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get('/quizQuestions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Questions error:', error);
        Alert.alert('Nie udało się pobrać pytań. Spróbuj ponownie.');
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    const correctOptionIndex = questions[currentQuestionIndex].correctOption;
    setCorrectOption(correctOptionIndex);

    if (index === correctOptionIndex) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setCorrectOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSaveScore = async () => {
    Alert.alert('Koniec quizu', 'Gratulacje, ukończyłeś quiz!');
    await AsyncStorage.setItem('lastQuizScore', JSON.stringify({ correctAnswers, incorrectAnswers }));
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setCorrectOption(null);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuizCompleted(false);
  };

  const getButtonStyle = (index) => {
    if (selectedOption !== null) {
      if (index === correctOption) return styles.correctOption;
      if (index === selectedOption) return styles.incorrectOption;
    }
    return styles.option;
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie pytań...</Text>
      </View>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
        <Text style={styles.cardText}>{currentQuestion.question}</Text>
      </View>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getButtonStyle(index)}
          onPress={() => handleOptionPress(index)}
          disabled={selectedOption !== null}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {selectedOption !== null && !quizCompleted &&(
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}

      {quizCompleted &&(
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveScore}>
          <Text style={styles.nextButtonText}>Zapisz wynik</Text>
        </TouchableOpacity>
      )}

      {quizCompleted &&/*currentQuestionIndex === questions.length - 1 && selectedOption !== null &&*/ (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Prawidłowe odpowiedzi: {correctAnswers}</Text>
          <Text style={styles.resultText}>Błędne odpowiedzi: {incorrectAnswers}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetQuiz}>
            <Text style={styles.resetButtonText}>Reset Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // dark mode conflicts with backgroundColor
    // backgroundColor: '#f9f9f9',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    width: 220,
    height: 150,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  incorrectOption: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
