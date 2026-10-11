import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { mobileApi } from '../api/mobileApi';

export const MobileCopilotScreen = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'ClauseGuard Copilot Ready. Ask any question about your contracts.' }
  ]);

  const handleSend = async () => {
    if (!question.trim()) return;
    const q = question;
    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setQuestion('');

    const res = await mobileApi.askCopilot('doc-1', q);
    setMessages(prev => [...prev, { sender: 'ai', text: res.answer }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ClauseGuard Copilot QA</Text>
        <Text style={styles.sub}>Grounded mobile document intelligence</Text>
      </View>

      <ScrollView contentContainerStyle={styles.chatList}>
        {messages.map((m, i) => (
          <View key={i} style={[styles.bubble, m.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={[styles.bubbleText, m.sender === 'user' ? styles.userText : styles.aiText]}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question about your contract..."
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Ask</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7EC',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#071B45',
  },
  sub: {
    fontSize: 11,
    color: '#667085',
  },
  chatList: {
    padding: 16,
    gap: 10,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#155EEF',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
  },
  bubbleText: {
    fontSize: 12,
    lineHeight: 18,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#101828',
  },
  inputBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E7EC',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  sendButton: {
    backgroundColor: '#155EEF',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
});
