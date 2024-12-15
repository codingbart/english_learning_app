import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function QuizScreen() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(2);
  const [currentQuestion, setCurrentQuestion] = useState(2);

  const options = [
    'Mysz',
    'Pies',
    'Kot',
    'Jaszczurka',
  ];

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const getButtonStyle = (index) => {
    if (selectedOption !== null) {
      if (index === correctOption) return styles.correctOption;
      if (index === selectedOption) return styles.incorrectOption;
    }
    return styles.option;
  };

  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Question {currentQuestion} of 5</Text>
        <Text style={styles.questionText}>What does 'cat' mean?</Text>
      </View>

      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getButtonStyle(index)}
          onPress={() => handleOptionPress(index)}
          disabled={selectedOption !== null}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next Question</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 16,
    color: '#555',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  option: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#8BC34A',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  incorrectOption: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#448AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
